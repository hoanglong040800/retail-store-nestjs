import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EBase } from './base.entity';
import { ICategory } from '../interface';
import { EProduct } from './product.entity';

@Entity('categories')
export class ECategory extends EBase implements ICategory {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  name?: string;

  @Column({
    name: 'level',
    type: 'int',
    width: 1,
  })
  level: number;

  @Column({
    name: 'icon',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  icon?: string;

  @Column({
    name: 'is_leaf',
    type: 'boolean',
  })
  isLeaf: boolean;

  @Column({
    name: 'display_order',
    type: 'int',
    width: 2,
    nullable: true,
  })
  displayOrder?: number;

  // @Column({
  //   name: 'parent_id',
  //   type: 'uuid',
  //   nullable: true,
  // })
  // parentId?: string;

  // ------------- REFERENCE ------------

  @ManyToOne(() => ECategory, (category) => category.id, { nullable: true })
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentCategory?: ECategory;

  @OneToMany(() => ECategory, (category) => category.parentCategory, {
    nullable: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'parent_id' })
  childCategories?: ECategory[];

  @OneToMany(() => EProduct, (product) => product.category)
  @JoinColumn({ name: 'id', referencedColumnName: 'leaf_category_id' })
  products?: EProduct[];
}
