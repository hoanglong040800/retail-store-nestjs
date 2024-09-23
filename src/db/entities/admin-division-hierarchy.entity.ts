import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EBranch } from './branch.entity';
import { EBase } from './base.entity';
import { IAdminDivisionHierarchy } from '../interface';
import { AdminDivisionType } from '../enum';

@Entity('admin_division_hierarchy')
export class EAdminDivisionHierarchy
  extends EBase
  implements IAdminDivisionHierarchy
{
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

  @Column({
    name: 'area_code',
    type: 'int',
    nullable: true,
  })
  areaCode?: number;

  // -------- REFERENCES --------
  @ManyToOne(() => EAdminDivisionHierarchy, (ward) => ward.parent)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parent: EAdminDivisionHierarchy;

  @OneToMany(() => EBranch, (branch) => branch.ward)
  branches: EBranch[];
}
