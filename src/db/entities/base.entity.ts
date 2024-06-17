import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IBase } from '../interface';

export abstract class EBase implements IBase {
  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'created_by',
    type: 'uuid',
    nullable: true,
  })
  createdBy?: string;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy?: string;

  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;
}
