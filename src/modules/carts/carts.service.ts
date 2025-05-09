import { HttpStatus, Injectable } from '@nestjs/common';
import { CartsRepo } from './carts.repo';
import { AuditUser, ECart, ECartItem } from '@/db/entities';
import { CartStatusEnum, DeliveryTypeEnum } from '@/db/enum';
import { MutateCartItem } from '@/db/input/cart.input';
import { SignedTokenUser } from '../auth/auth.type';
import { CustomException } from '@/guard';
import { CartItemsService } from '../cart-items';
import { CartCalculationDto, CartDto } from '@/db/dto';
import { UpdateCartDto, calculateCart } from './shared';
import { Transactional } from 'typeorm-transactional';

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
    cartId?: string | null;
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

    // if cartId + userId and not found -> meaning these values are not matched -> throw error instead of creating new cart -> avoid dup cart
    if (cartId && userId && !userActiveCart) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (userActiveCart) {
      return userActiveCart;
    }

    // old cart was checkout, first login -> create new cart
    return this.repo.save(
      {
        user: {
          id: userId,
        },
      },

      { id: userId },
    );
  }

  @Transactional()
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

      // allow to handle without cart id -> faster testing
      cartId: cartId === 'null' ? null : cartId,
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

  async getUserCart(userId: string): Promise<ECart> {
    const userCart = await this.repo.findOne({
      relations: {
        cartItems: {
          product: true,
        },
      },

      where: {
        status: CartStatusEnum.new,
        user: {
          id: userId,
        },
      },
    });

    if (!userCart) {
      throw new CustomException(
        'USER_CART_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `userId: ${userId}`,
      );
    }

    return userCart;
  }

  async updateCart(
    updateDto: UpdateCartDto,
    auditUser: AuditUser,
  ): Promise<ECart> {
    return this.repo.update(updateDto.id, updateDto, auditUser);
  }

  calculateCart(
    cartItems: ECartItem[] | undefined,
    { deliveryType }: { deliveryType: DeliveryTypeEnum },
  ): CartCalculationDto {
    return calculateCart(cartItems, { deliveryType });
  }
}
