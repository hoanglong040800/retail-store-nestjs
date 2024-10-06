import { Column, Entity, OneToOne } from 'typeorm';
import { IOrder } from '../interface';
import { DeliveryTypeEnum, OrderStatusEnum } from '../enum';
import { ECart } from './cart.entity';
import { EBase } from './base.entity';

@Entity('orders')
export class EOrder extends EBase implements IOrder {
  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.pending,
  })
  status?: OrderStatusEnum;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
  })
  address?: string;

  @Column({
    name: 'delivery_type',
    type: 'enum',
    enum: DeliveryTypeEnum,
  })
  deliveryType?: DeliveryTypeEnum;

  // ------- Relationships -------
  userId: string;

  @OneToOne(() => ECart, (cart) => cart.id, { nullable: false })
  cartId?: string;

  branchId: string;

  deliveryWardId?: string;
}
