import { Column, Entity, OneToOne } from 'typeorm';
import { IOrder } from '../interface';
import { DeliveryTypeEnum, OrderStatusEnum } from '../enum';
import { ECart } from './cart.entity';
import { EBase } from './base.entity';
import { EUser } from './user.entity';
import { EBranch } from './branch.entity';
import { EAdminDivision } from './admin-division-hierarchy.entity';

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
  @OneToOne(() => EUser, (user) => user.id, { nullable: false })
  user?: EUser;

  @OneToOne(() => ECart, (cart) => cart.order, { nullable: false })
  cart?: ECart;

  @OneToOne(() => EBranch, (branch) => branch.orders, { nullable: false })
  branch: EBranch;

  @OneToOne(() => EAdminDivision, (adminDivision) => adminDivision.orders)
  deliveryWard?: EAdminDivision;
}
