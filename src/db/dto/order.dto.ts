import { DeliveryTypeEnum, OrderStatusEnum, PaymentMethodEnum } from '../enum';
import { IOrder } from '../interface';
import { AdminDivisionDto } from './admin-division.dto';
import { BaseDto } from './base.dto';
import { BranchDto } from './branch.dto';
import { CartCalculationDto, CartDto } from './cart.dto';
import { UserDto } from './user.dto';

export class OrderDto extends BaseDto implements IOrder {
  createdAt?: Date;

  status?: OrderStatusEnum;
  address?: string;
  deliveryType?: DeliveryTypeEnum;

  // after load
  calculation?: CartCalculationDto;

  // relation
  user?: UserDto;
  cartId?: string;
  branch?: BranchDto;
  deliveryWard?: AdminDivisionDto;
  paymentMethod?: PaymentMethodEnum;
  cart?: CartDto;
}
