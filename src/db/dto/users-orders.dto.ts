import { OrderDto } from './order.dto';

export type UserOrderDto = Pick<
  Required<OrderDto>,
  'id' | 'deliveryType' | 'cart' | 'status' | 'createdAt'
>;

export type GetUserOrdersDto = {
  orders: UserOrderDto[];
};

export class GetUserOrderDetailDto {
  order: OrderDto;
}
