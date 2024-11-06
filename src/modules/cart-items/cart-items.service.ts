import { HttpStatus, Injectable } from '@nestjs/common';
import { CartItemsRepo } from './cart-items.repo';
import { AuditUser, ECart, ECartItem, EProduct } from '@/db/entities';
import { CustomException } from '@/guard';
import { CreateUpdateCartItemDto } from './cart-items-repo.dto';
import { MutateCartItem } from '@/db/input';
import { ProductsRepo } from '../products';
import { In } from 'typeorm';
import { keyBy } from '@/utils';

@Injectable()
export class CartItemsService {
  constructor(
    private readonly repo: CartItemsRepo,
    private readonly productRepo: ProductsRepo,
  ) {}

  private async getProductsOfCartItems(
    cartItems: MutateCartItem[],
  ): Promise<Record<string, EProduct>> {
    const cartItemProductIds: string[] = cartItems.map(
      (item) => item.productId,
    );

    const cartProducts = await this.productRepo.find({
      where: {
        id: In(cartItemProductIds),
      },
    });

    const productsById: Record<string, EProduct> = keyBy(
      cartProducts || [],
      'id',
    );

    return productsById;
  }

  async addMultiCartItems(
    cartItems: MutateCartItem[],
    cart: ECart,
    auditUser: AuditUser,
  ): Promise<boolean> {
    if (!cart) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!cartItems || cartItems.length === 0) {
      return true;
    }

    if (!auditUser) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const productsGroupById: Record<string, EProduct> =
      await this.getProductsOfCartItems(cartItems);

    const promisesAddCartItems = cartItems.map((item) =>
      this.addCartItem(
        item,
        cart,
        auditUser,
        productsGroupById[item.productId],
      ),
    );

    await Promise.all(promisesAddCartItems);

    return true;
  }

  async addCartItem(
    cartItem: MutateCartItem,
    cart: ECart,
    auditUser: AuditUser,
    product: EProduct,
  ): Promise<ECartItem | boolean> {
    if (!cart) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const existingCartItem = cartItem.id
      ? { id: cartItem.id }
      : await this.repo.findOne({
          select: ['id'],
          where: {
            cart: {
              id: cart.id,
            },

            product: {
              id: cartItem.productId,
            },
          },
        });

    const cartItemPayload: CreateUpdateCartItemDto = {
      ...cartItem,
      cartId: cart.id,
      price: this.calculateCartItem(cartItem, product),
    };

    if (existingCartItem) {
      return cartItem.quantity > 0
        ? this.repo.update(existingCartItem.id, cartItemPayload, auditUser)
        : this.repo.delete(existingCartItem.id);
    }

    return this.repo.save(cartItemPayload, auditUser);
  }

  private calculateCartItem(
    cartItem: MutateCartItem,
    product: EProduct,
  ): number {
    if (!product || !cartItem) {
      throw new Error('product or cartItem not found');
    }

    const finalPrice = cartItem.quantity * product.price;

    return finalPrice;
  }

  async getCartItemsByCartId(cartId: string): Promise<ECartItem[]> {
    if (!cartId) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `param cartId: ${cartId} not found`,
      );
    }

    return this.repo.find({
      relations: {
        product: true,
      },
      where: {
        cartId,
      },
    });
  }

  async calculateCartItems(
    cartItems: ECartItem[] | MutateCartItem[],
  ): Promise<ECartItem[]> {
    if (!cartItems || cartItems.length === 0) {
      return [];
    }

    const parsedCartItems: MutateCartItem[] = cartItems.reduce((prev, cur) => {
      if (!cur.id || !cur.product?.id || !cur.quantity) {
        return prev;
      }

      const mutateCartItem: MutateCartItem = {
        id: cur.id,
        productId: cur.product.id,
        quantity: cur.quantity,
      };

      return [...prev, mutateCartItem];
    }, []);

    const productsGroupById: Record<string, EProduct> =
      await this.getProductsOfCartItems(parsedCartItems);

    return [];
  }
}
