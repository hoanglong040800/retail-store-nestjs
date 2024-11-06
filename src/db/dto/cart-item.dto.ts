import { ICartItem } from '../interface';
import { BaseDto } from './base.dto';
import { ProductDto } from './product.dto';

export class CartItemDto extends BaseDto implements ICartItem {
  quantity?: number;
  basePrice?: number;
  totalPrice?: number;

  product?: ProductDto;
}
