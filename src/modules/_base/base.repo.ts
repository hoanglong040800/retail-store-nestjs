import { Injectable } from '@nestjs/common';
import { AuditUser } from '@/db/entities';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { RepoCreatePayload, RepoUpdatePayload } from './base.type';

@Injectable()
export abstract class BaseRepo<T> {
  find?(options?: FindManyOptions<T>): Promise<T[]>;

  findOne?(options: FindOneOptions<T>): Promise<T | null>;

  save?(createPayload: RepoCreatePayload<T>, auditUser: AuditUser): Promise<T>;

  update?(
    id: string,
    updatePayload: RepoUpdatePayload<T>,
    auditUser: AuditUser,
  ): Promise<T>;

  delete?(id: string, auditUser?: AuditUser): Promise<boolean>;
}
