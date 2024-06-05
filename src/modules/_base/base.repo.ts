import { Injectable } from '@nestjs/common';
import { AuditUser } from '@/db/entities';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export abstract class BaseRepo<T> {
  find?(options?: FindManyOptions<T>): Promise<T[]>;

  findOne?(options: FindOneOptions<T>): Promise<T | null>;

  save?(createDto: any, auditUser: AuditUser): Promise<T>;

  update?(id: string, updateDto: any, auditUser: AuditUser): Promise<T>;

  delete?(id: string, auditUser?: AuditUser): Promise<boolean>;
}
