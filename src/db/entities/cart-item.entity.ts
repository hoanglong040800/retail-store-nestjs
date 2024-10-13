import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => ECart, (c) => c.cartItems, { nullable: false })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: ECart;

  @ManyToOne(() => EProduct, (p) => p.cartItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: EProduct;
}
