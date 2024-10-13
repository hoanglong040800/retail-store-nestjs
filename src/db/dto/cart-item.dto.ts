import { EProduct } from '../entities';
import { ICartItem } from '../interface';
import { BaseDto } from './base.dto';

export class CartItemDto extends BaseDto implements ICartItem {
  quantity?: number;
  price?: number;

  product?: EProduct;
}
