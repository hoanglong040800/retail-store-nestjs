import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EBase } from './base.entity';
import { ICart } from '../interface';
import { EOrder } from './order.entity';
import { EUser } from './user.entity';
import { ECartItem } from './cart-item.entity';
import { CartStatusEnum } from '../enum';

@Entity('carts')
export class ECart extends EBase implements ICart {
  @Column({
    name: 'status',
    type: 'enum',
    enum: CartStatusEnum,
    default: CartStatusEnum.new,
  })
  status?: CartStatusEnum;

  // ------- RELATION --------
  @ManyToOne(() => EUser, (u) => u.carts, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' }) // MUST have join column because TypeORM will auto convert column user_id -> userId
  user?: EUser;

  @OneToOne(() => EOrder, (o) => o.cart, { nullable: true })
  order?: EOrder;

  @OneToMany(() => ECartItem, (ci) => ci.cart, { nullable: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  cartItems?: ECartItem[];
}
