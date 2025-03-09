import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EBase } from './base.entity';
import { IBranch } from '../interface';
import { EAdminDivision } from './admin-division-hierarchy.entity';
import { EOrder } from './order.entity';
import { EUser } from './user.entity';

@Entity('branches')
export class EBranch extends EBase implements IBranch {
  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  name?: string;

  // need define wardId so we can run migration
  @Column({
    name: 'ward_id',
    type: 'uuid',
    nullable: false,
  })
  wardId: string;

  @Column({
    name: 'district_id',
    type: 'uuid',
    nullable: false,
  })
  districtId: string;

  @Column({
    name: 'province_id',
    type: 'uuid',
    nullable: false,
  })
  provinceId: string;

  // -------- REFERENCE --------
  // MUST JOIN COLUMN or else TYPEORM will understand column as wardId
  @ManyToOne(() => EAdminDivision, (adminDivision) => adminDivision.branches)
  @JoinColumn({ name: 'ward_id', referencedColumnName: 'id' })
  ward?: EAdminDivision;

  @ManyToOne(() => EAdminDivision, (adminDivision) => adminDivision.branches)
  @JoinColumn({ name: 'district_id', referencedColumnName: 'id' })
  district?: EAdminDivision;

  @ManyToOne(() => EAdminDivision, (adminDivision) => adminDivision.branches)
  @JoinColumn({ name: 'province_id', referencedColumnName: 'id' })
  province?: EAdminDivision;

  @OneToMany(() => EOrder, (order) => order.branch)
  orders?: EOrder[];

  @OneToMany(() => EUser, (user) => user.branch)
  users?: EUser[];
}
