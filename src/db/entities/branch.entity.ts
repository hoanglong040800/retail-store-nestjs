import { Column, Entity, ManyToOne } from 'typeorm';
import { EBase } from './base.entity';
import { IBranch } from '../interface';
import { EAdminDivision } from './admin-division-hierarchy.entity';

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

  @Column({
    name: 'ward_id',
    type: 'uuid',
  })
  wardId: string;

  @Column({
    name: 'district_id',
    type: 'uuid',
  })
  districtId: string;

  @Column({
    name: 'province_id',
    type: 'uuid',
    nullable: false,
  })
  provinceId: string;

  // -------- REFERENCE --------
  @ManyToOne(() => EAdminDivision, (ward) => ward.branches)
  ward: EAdminDivision;

  @ManyToOne(() => EAdminDivision, (ward) => ward.branches)
  district: EAdminDivision;

  @ManyToOne(() => EAdminDivision, (ward) => ward.branches)
  province: EAdminDivision;
}
