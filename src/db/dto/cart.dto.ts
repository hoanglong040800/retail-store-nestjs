import { CartStatusEnum } from '../enum';
import { ICart } from '../interface';
import { BaseDto } from './base.dto';
import { CartItemDto } from './cart-item.dto';

export class CartDto extends BaseDto implements ICart {
  status?: CartStatusEnum;
  cartItems?: CartItemDto[];
}
