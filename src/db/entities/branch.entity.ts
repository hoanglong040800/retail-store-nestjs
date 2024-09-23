import { Column, Entity, ManyToOne } from 'typeorm';
import { EBase } from './base.entity';
import { IBranch } from '../interface';
import { EAdminDivisionHierarchy } from './admin-division-hierarchy.entity';

@Entity('branches')
export class EBranch extends EBase implements IBranch {
  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  // -------- REFERENCE --------
  @ManyToOne(() => EAdminDivisionHierarchy, (ward) => ward.branches)
  ward: EAdminDivisionHierarchy;
}
