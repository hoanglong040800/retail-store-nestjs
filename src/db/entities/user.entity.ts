import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { EBase } from './base.entity';
import { IUser } from '../interface';
import { ECart } from './cart.entity';
import { EOrder } from './order.entity';
import { EBranch } from './branch.entity';
import { EAdminDivision } from './admin-division-hierarchy.entity';

@Entity('users')
export class EUser extends EBase implements IUser {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 50,
  })
  firstName?: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 50,
  })
  lastName?: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 200,
    nullable: true,
    select: false,
  })
  refreshToken?: string;

  @Column({
    name: 'branch_id',
    type: 'uuid',
    nullable: true,
  })
  branchId?: string;

  @Column({
    name: 'delivery_ward_id',
    type: 'uuid',
    nullable: true,
  })
  deliveryWardId?: string;

  // ------ RELATIONS ------
  @OneToMany(() => ECart, (cart) => cart.user, { nullable: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  carts?: ECart[];

  @OneToMany(() => EOrder, (order) => order.user, { nullable: true })
  orders?: EOrder[];

  @ManyToOne(() => EBranch, (branch) => branch.users, { nullable: true })
  @JoinColumn({ name: 'branch_id', referencedColumnName: 'id' })
  branch?: EBranch;

  @ManyToOne(() => EAdminDivision, (adminDivision) => adminDivision.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'delivery_ward_id', referencedColumnName: 'id' })
  deliveryWard?: EAdminDivision;
}

export class AuditUser implements IUser {
  id: string;
}
