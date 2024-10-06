import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ICartItem } from '../interface';
import { EBase } from './base.entity';
import { ECart } from './cart.entity';
import { EProduct } from './product.entity';

@Entity('cart_items')
export class ECartItem extends EBase implements ICartItem {
  @Column({
    name: 'quantity',
    type: 'int',
  })
  quantity?: number; // 0 < x <= 100

  @Column({
    name: 'price',
    type: 'float',
  })
  price?: number;

  // ---------- RELATION ---------

  @OneToMany(() => ECart, (cart) => cart.cartItems, { nullable: false })
  cart?: ECart;

  @ManyToOne(() => EProduct, (product) => product.cartItems, {
    nullable: false,
  })
  product?: string;
}
