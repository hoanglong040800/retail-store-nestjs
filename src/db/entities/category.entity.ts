import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EBase } from './base.entity';
import { ICategory } from '../interface';

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

  // ------------- REFERENCE ------------

  @ManyToOne(() => ECategory, (category) => category.id, { nullable: true })
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentId?: string;
}
