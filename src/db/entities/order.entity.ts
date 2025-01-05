import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IOrder } from '../interface';
import { DeliveryTypeEnum, OrderStatusEnum, PaymentMethodEnum } from '../enum';
import { ECart } from './cart.entity';
import { EBase } from './base.entity';
import { EUser } from './user.entity';
import { EBranch } from './branch.entity';
import { EAdminDivision } from './admin-division-hierarchy.entity';
import { CartCalculationDto } from '../dto';
import { calculateCart } from '@/modules/carts/shared';
import { ECartItem } from './cart-item.entity';

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

  calculation?: CartCalculationDto;
  @AfterLoad()
  getCartCalculation() {
    this.calculation = calculateCart(this.cart?.cartItems as ECartItem[], {
      deliveryType: this.deliveryType as DeliveryTypeEnum,
    });
  }

  // ---- RELATIONSHIP FIELDS (need these so typeorm can save) (avoid violate not-null constraint) --------

  @Column({
    name: 'cart_id',
    type: 'uuid',
    nullable: false,
  })
  cartId?: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: false,
  })
  userId?: string;

  @Column({
    name: 'delivery_ward_id',
    type: 'uuid',
    nullable: true,
  })
  deliveryWardId?: string;

  @Column({
    name: 'branch_id',
    type: 'uuid',
    nullable: true,
  })
  branchId?: string;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethodEnum,
    default: PaymentMethodEnum.cash,
    nullable: false,
  })
  paymentMethod?: PaymentMethodEnum;

  // ------- Relationships -------

  @OneToOne(() => EUser, (user) => user.id, { nullable: false })
  user?: EUser;

  @OneToOne(() => ECart, (cart) => cart.order, { nullable: false })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: ECart;

  @OneToOne(() => EBranch, (branch) => branch.orders, { nullable: false })
  branch: EBranch;

  @OneToOne(() => EAdminDivision, (adminDivision) => adminDivision.orders)
  @JoinColumn({ name: 'delivery_ward_id', referencedColumnName: 'id' })
  deliveryWard?: EAdminDivision;
}
