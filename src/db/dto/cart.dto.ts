import { CartStatusEnum } from '../enum';
import { ICart } from '../interface';
import { BaseDto } from './base.dto';
import { BranchDto } from './branch.dto';
import { CartItemDto } from './cart-item.dto';
import { OrderDto } from './order.dto';

export class CartCalculationDto {
  subTotal: number; // total cost of all items without any discount/tax
  // discountTotal?: number // total discount amount
  // taxTotal?: number // total tax amount
  shippingFee: number; // shipping fee
  totalAmount: number; // final amount that include discount and tax
}

export class CartDto extends BaseDto implements ICart {
  status?: CartStatusEnum;
  cartItems?: CartItemDto[];

  calculation?: CartCalculationDto; // extra field to display calculation
}

export class CheckoutDto {
  order: OrderDto;
  selectedBranch: BranchDto;
}
