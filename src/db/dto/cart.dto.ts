import { ECartItem } from '../entities';
import { CartStatusEnum } from '../enum';
import { ICart } from '../interface';
import { BaseDto } from './base.dto';

export class CartDto extends BaseDto implements ICart {
  status?: CartStatusEnum;
  cartItems?: ECartItem[];
}
