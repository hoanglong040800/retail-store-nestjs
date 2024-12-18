import { DeliveryTypeEnum, OrderStatusEnum } from '../enum';
import { IOrder } from '../interface';
import { AdminDivisionDto } from './admin-division.dto';
import { BaseDto } from './base.dto';
import { BranchDto } from './branch.dto';
import { UserDto } from './user.dto';

export class OrderDto extends BaseDto implements IOrder {
  status?: OrderStatusEnum;
  address?: string;
  deliveryType?: DeliveryTypeEnum;

  user?: UserDto;
  cartId?: string;
  branch?: BranchDto;
  deliveryWard?: AdminDivisionDto;
}
