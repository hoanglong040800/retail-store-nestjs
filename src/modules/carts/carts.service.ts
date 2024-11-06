import { HttpStatus, Injectable } from '@nestjs/common';
import { CartsRepo } from './carts.repo';
import { ECart, ECartItem } from '@/db/entities';
import { CartStatusEnum, DeliveryTypeEnum } from '@/db/enum';
import { CheckoutBody, MutateCartItem } from '@/db/input/cart.input';
import { SignedTokenUser } from '../auth/auth.type';
import { CustomException } from '@/guard';
import { CartItemsService } from '../cart-items';
import { CartCalculationDto, CartDto, CheckoutDto } from '@/db/dto';
import {
  calculateCartTotalAmount,
  calculateShippingFee,
  calculateSubTotal,
  convertCartItemsToMutateCartItems,
} from './shared';

@Injectable()
export class CartsService {
  constructor(
    private readonly repo: CartsRepo,
    private readonly cartItemSrv: CartItemsService,
  ) {}

  // only use this function to get/create user cart -> avoid dup cart
  async getOrCreateUserCart({
    userId,
    cartId,
  }: {
    userId: string;
    cartId?: string;
  }): Promise<ECart> {
    const userActiveCart = await this.repo.findOne({
      relations: {
        user: true,
      },

      where: {
        ...(cartId ? { id: cartId } : {}),

        status: CartStatusEnum.new,
        user: {
          id: userId,
        },
      },
    });

    if (userActiveCart) {
      return userActiveCart;
    }

    // if cartId + userId and not found -> meaning these values are not matched -> throw error instead of creating new cart -> avoid dup cart
    if (cartId && userId) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return this.repo.save(
      {
        user: {
          id: userId,
        },
      },

      { id: userId },
    );
  }

  async addCartItems(
    cartId: string,
    cartItemInputs: MutateCartItem[],
    user: SignedTokenUser,
  ): Promise<CartDto> {
    if (!cartId) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `param cartId: ${cartId} not found`,
      );
    }

    if (!user?.id) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `param user not found`,
      );
    }

    const userCart: ECart = await this.getOrCreateUserCart({
      userId: user.id,
      cartId,
    });

    if (!userCart) {
      throw new CustomException(
        'USER_CART_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `userId: ${user.id}, cartId: ${cartId}`,
      );
    }

    await this.cartItemSrv.addMultiCartItems(cartItemInputs, userCart, user);

    const latestAllCartItems = await this.cartItemSrv.getCartItemsByCartId(
      userCart.id,
    );

    const resultCart: CartDto = {
      ...userCart,
      cartItems: latestAllCartItems,
    };

    return resultCart;
  }

  async getCartById(
    cartId: string,
    { deliveryType }: { deliveryType: DeliveryTypeEnum },
    user: SignedTokenUser,
  ): Promise<CartDto> {
    if (!cartId) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `param cartId: ${cartId} not found`,
      );
    }

    const cart = await this.repo.findOne({
      relations: {
        cartItems: {
          product: true,
        },
      },

      where: {
        id: cartId,
        user: {
          id: user.id,
        },
      },
    });

    if (!cart) {
      throw new CustomException(
        'USER_CART_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `cartId: ${cartId}`,
      );
    }

    const resultCart: CartDto = {
      ...cart,
      calculation: this.calculateCart(cart.cartItems, {
        deliveryType,
      }),
    };

    return resultCart;
  }

  calculateCart(
    cartItems: ECartItem[] | undefined,
    { deliveryType }: { deliveryType: DeliveryTypeEnum },
  ): CartCalculationDto {
    if (!cartItems) {
      return {
        subTotal: 0,
        shippingFee: 0,
        totalAmount: 0,
      };
    }

    const subTotal = calculateSubTotal(cartItems);
    const shippingFee = calculateShippingFee(deliveryType);
    const totalAmount = calculateCartTotalAmount({
      subTotal,
      shippingFee,
    });

    return {
      subTotal,
      shippingFee,
      totalAmount,
    };
  }

  async checkout(
    cartId: string,
    body: CheckoutBody,
    user: SignedTokenUser,
  ): Promise<CheckoutDto> {
    try {
      if (!cartId) {
        throw new CustomException(
          'PARAMS_NOT_FOUND',
          HttpStatus.NOT_FOUND,
          `param cartId: ${cartId} not found`,
        );
      }

      if (!body) {
        throw new CustomException(
          'PARAMS_NOT_FOUND',
          HttpStatus.NOT_FOUND,
          `param body: ${body} not found`,
        );
      }

      if (!user?.id) {
        throw new CustomException(
          'PARAMS_NOT_FOUND',
          HttpStatus.NOT_FOUND,
          `param user not found`,
        );
      }

      const userCart = await this.repo.findOne({
        relations: {
          cartItems: {
            product: true,
          },
        },

        where: {
          id: cartId,
          user: {
            id: user.id,
          },
        },
      });

      if (!userCart) {
        throw new CustomException(
          'USER_CART_NOT_FOUND',
          HttpStatus.NOT_FOUND,
          `userId: ${user.id}, cartId: ${cartId}`,
        );
      }

      const mutateCartItems: MutateCartItem[] =
        convertCartItemsToMutateCartItems(userCart.cartItems);

      await this.cartItemSrv.addMultiCartItems(mutateCartItems, userCart, user);

      return {
        order: { id: 'random' },
      };
    } catch (err) {
      throw err;
    }
  }
}
