import { Entity, OneToOne } from 'typeorm';
import { EBase } from './base.entity';
import { ICart } from '../interface';
import { EOrder } from './order.entity';

@Entity('carts')
export class ECart extends EBase implements ICart {
  // ------- RELATION --------
  @OneToOne(() => EOrder, (order) => order.cartId, { nullable: true })
  order?: EOrder;
}
