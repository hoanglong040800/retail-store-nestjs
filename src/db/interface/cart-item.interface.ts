import { IBase } from './base.interface';

export interface ICartItem extends IBase {
  quantity?: number;
  price?: number;
  cartId?: string;
  productId?: string;
}
