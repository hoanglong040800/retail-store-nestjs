import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EBase } from './base.entity';

@Entity('categories')
export class ECategory extends EBase {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name?: string;

  @Column({
    name: 'level',
    type: 'int',
    width: 1,
    nullable: false,
  })
  level?: number;

  @Column({
    name: 'icon',
    type: 'varchar',
    length: 300,
  })
  icon?: string;

  @Column({
    name: 'is_leaf',
    type: 'boolean',
    nullable: false,
  })
  isLeaf?: boolean;

  @Column({
    name: 'display_order',
    type: 'int',
    width: 2,
  })
  displayOrder?: number;

  // ------------- REFERENCE ------------

  @ManyToOne(() => ECategory, (category) => category.id)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentId?: string;
}
