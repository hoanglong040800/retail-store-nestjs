import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ICartItem } from '../interface';
import { EBase } from './base.entity';
import { ECart } from './cart.entity';
import { EProduct } from './product.entity';

@Entity('cart_items')
export class ECartItem extends EBase implements ICartItem {
  @Column({
    name: 'quantity',
    type: 'smallint',
  })
  quantity?: number; // 0 < x <= 100

  @Column({
    name: 'base_price',
    type: 'integer',
    nullable: false,
  })
  basePrice: number;

  @Column({
    name: 'total_price',
    type: 'integer',
    nullable: false,
  })
  totalPrice: number;

  @Column({
    name: 'cart_id',
    type: 'uuid',
    nullable: false,
  })
  cartId?: string;

  @Column({
    name: 'product_id',
    type: 'uuid',
    nullable: false,
  })
  productId?: string;

  // ---------- RELATION ---------

  @ManyToOne(() => ECart, (c) => c.cartItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: ECart;

  @ManyToOne(() => EProduct, (p) => p.cartItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: EProduct;
}
