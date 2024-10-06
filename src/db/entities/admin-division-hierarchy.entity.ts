import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EBranch } from './branch.entity';
import { EBase } from './base.entity';
import { IAdminDivision } from '../interface';
import { AdminDivisionType } from '../enum';
import { EOrder } from './order.entity';

@Entity('admin_division_hierarchy')
export class EAdminDivision extends EBase implements IAdminDivision {
  @Column({
    name: 'type',
    type: 'enum',
    enum: AdminDivisionType,
  })
  type: AdminDivisionType;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'fullname',
    type: 'varchar',
    length: 150,
  })
  fullname: string;

  @Column({
    name: 'code',
    type: 'int',
    nullable: true,
  })
  code?: number;

  // add parent id for inserting
  @Column({
    name: 'parent_id',
    type: 'uuid',
    nullable: true,
  })
  parentId?: string;

  // -------- REFERENCES --------

  // EXAMPLE OF HIERARCHY ORM
  @ManyToOne(() => EAdminDivision, (division) => division.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parentDivision?: EAdminDivision;

  @OneToMany(() => EAdminDivision, (division) => division.parentDivision)
  @JoinColumn({ name: 'id', referencedColumnName: 'parent_id' })
  childDivisions?: EAdminDivision[];

  @OneToMany(() => EBranch, (branch) => branch.ward)
  @JoinColumn({ name: 'id', referencedColumnName: 'ward_id' })
  branches?: EBranch[];

  @OneToMany(() => EOrder, (order) => order.deliveryWard)
  orders: EOrder[];
}
