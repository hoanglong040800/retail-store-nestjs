import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IProduct } from '../interface';
import { EBase } from './base.entity';
import { ECategory } from './category.entity';

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
    type: 'numeric',
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true,
  })
  image?: string;

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
}
