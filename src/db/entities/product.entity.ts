import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IProduct } from '../interface';
import { EBase } from './base.entity';
import { ECategory } from './category.entity';
import { ProductUnitEnum } from '../enum';
import { ECartItem } from './cart-item.entity';

@Entity('products')
export class EProduct extends EBase implements IProduct {
  @Column({
    name: 'barcode',
    type: 'varchar',
    length: 13,
    nullable: false,
  })
  barcode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description?: string;

  @Column({
    name: 'active',
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column({
    name: 'price',
    type: 'integer',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true,
  })
  image?: string;

  @Column({
    name: 'unit',
    type: 'enum',
    enum: ProductUnitEnum,
    nullable: true,
  })
  unit?: ProductUnitEnum;

  // add reference column to insert data
  @Column({
    name: 'leaf_category_id',
    type: 'uuid',
    nullable: false,
  })
  leafCategoryId: string;

  //  ------------ REFERENCES --------

  @ManyToOne(() => ECategory, (category) => category.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'leaf_category_id', referencedColumnName: 'id' }) // use @JoinColumb when field define different from table column
  category: ECategory;

  @OneToMany(() => ECartItem, (cartItem) => cartItem.product, {
    nullable: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'product_id' })
  cartItems?: ECartItem[];
}
