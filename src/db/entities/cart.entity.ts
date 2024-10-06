import { Entity, OneToOne } from 'typeorm';
import { EBase } from './base.entity';
import { ICart } from '../interface';
import { EOrder } from './order.entity';
import { EUser } from './user.entity';

@Entity('carts')
export class ECart extends EBase implements ICart {
  // ------- RELATION --------
  @OneToOne(() => EUser, (user) => user.id, { nullable: false })
  user?: EUser;

  @OneToOne(() => EOrder, (order) => order.cart, { nullable: true })
  order?: EOrder;
}
