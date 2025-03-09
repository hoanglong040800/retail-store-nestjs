import {
  DeliveryTypeEnum,
  OrderStatusEnum,
  PaymentMethodEnum,
} from '@/db/enum';
import { IOrder } from '@/db/interface';
import { StringFieldOptional, UUIDField } from '@/decorators';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto implements IOrder {
  status: OrderStatusEnum;

  @StringFieldOptional()
  address?: string;

  @IsNotEmpty()
  @IsEnum(DeliveryTypeEnum)
  deliveryType: DeliveryTypeEnum;

  @UUIDField()
  userId: string;

  @UUIDField()
  cartId: string;

  @UUIDField()
  branchId: string;

  @UUIDField()
  deliveryWardId: string;

  @IsNotEmpty()
  @IsEnum(PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;
}
