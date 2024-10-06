import { ECartItem } from '../entities';
import { ICart } from '../interface';
import { BaseDto } from './base.dto';

export class CartDto extends BaseDto implements ICart {
  cartItems?: ECartItem[];
}
