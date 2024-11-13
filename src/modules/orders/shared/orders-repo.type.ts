import { DeliveryTypeEnum, OrderStatusEnum } from '@/db/enum';
import { IOrder } from '@/db/interface';
import { StringFieldOptional, UUIDField } from '@/decorators';
import { IsEnum, IsNotEmpty } from 'class-validator';

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
}

export class UpdateOrderDto extends CreateOrderDto {
  id: string;
}
