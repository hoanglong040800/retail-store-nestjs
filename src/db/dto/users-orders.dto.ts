import { OrderDto } from './order.dto';
import { IBase } from '@/db/interface';

export type UserOrderDto = Pick<
  OrderDto,
  'id' | 'deliveryType' | 'cart' | 'status'
> &
  Pick<IBase, 'createdAt'>;

export type GetUserOrdersDto = {
  orders: UserOrderDto[];
};
