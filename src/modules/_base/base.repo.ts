import { Injectable } from '@nestjs/common';
import { EUser } from 'src/entities';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export abstract class BaseRepo<T> {
  abstract find(options?: FindManyOptions<T>): Promise<T[]>;

  abstract findOne(options?: FindOneOptions<T>): Promise<T | null>;

  abstract create(createDto: any, auditUser: EUser): Promise<T>;

  abstract update(
    id: string,
    updateDto: any,
    auditUser: EUser,
  ): Promise<T>;

  abstract delete(id: string, auditUser?: EUser): Promise<boolean>;
}
