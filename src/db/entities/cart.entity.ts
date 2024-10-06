import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { EBase } from './base.entity';
import { ICart } from '../interface';
import { EOrder } from './order.entity';
import { EUser } from './user.entity';
import { ECartItem } from './cart-item.entity';

@Entity('carts')
export class ECart extends EBase implements ICart {
  // ------- RELATION --------
  @ManyToOne(() => EUser, (user) => user.id, { nullable: false })
  user?: EUser;

  @OneToOne(() => EOrder, (order) => order.cart, { nullable: true })
  order?: EOrder;

  @ManyToOne(() => ECartItem, (cartItem) => cartItem.cart)
  cartItems?: ECartItem[];
}
