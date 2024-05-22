import { Injectable } from '@nestjs/common';
import { AuditUser } from '@/db/entities';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export abstract class BaseRepo<T> {
  abstract find(options?: FindManyOptions<T>): Promise<T[]>;

  abstract findOne(options?: FindOneOptions<T>): Promise<T | null>;

  abstract save(createDto: any, auditUser: AuditUser): Promise<T>;

  abstract update(id: string, updateDto: any, auditUser: AuditUser): Promise<T>;

  abstract delete(id: string, auditUser?: AuditUser): Promise<boolean>;
}
