import { DeliveryTypeEnum, OrderStatusEnum, PaymentMethodEnum } from '../enum';
import { IBase } from './base.interface';

export interface IOrder extends IBase {
  status?: OrderStatusEnum;
  address?: string;
  deliveryType?: DeliveryTypeEnum;
  userId?: string;
  cartId?: string;
  branchId?: string;
  deliveryWardId?: string;
  paymentMethod?: PaymentMethodEnum;
}
