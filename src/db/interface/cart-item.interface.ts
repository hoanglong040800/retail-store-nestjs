import { IBase } from './base.interface';

export interface ICartItem extends IBase {
  basePrice?: number;
  quantity?: number;
  totalPrice?: number;

  cartId?: string;
  productId?: string;
}
