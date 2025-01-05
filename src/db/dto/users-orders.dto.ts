import { OrderDto } from './order.dto';
import { IBase } from '../interface';
import { Expose } from 'class-transformer';

export type UserOrderDto = Pick<
  Required<OrderDto>,
  'id' | 'deliveryType' | 'cart' | 'status'
> &
  Pick<IBase, 'createdAt'>;

export type GetUserOrdersDto = {
  orders: UserOrderDto[];
};

export class GetUserOrderDetailDto {
  @Expose()
  order: Pick<OrderDto, 'id' | 'deliveryType' | 'cart' | 'status'>;
}
