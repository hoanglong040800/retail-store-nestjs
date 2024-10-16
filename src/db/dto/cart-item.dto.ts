import { ICartItem } from '../interface';
import { BaseDto } from './base.dto';
import { ProductDto } from './product.dto';

export class CartItemDto extends BaseDto implements ICartItem {
  quantity?: number;
  price?: number;

  product?: ProductDto;
}
