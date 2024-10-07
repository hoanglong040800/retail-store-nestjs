import { AuditUser, ECart } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BaseRepo } from '@/modules/_base';
import { CartStatusEnum } from '@/db/enum';
import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './carts-repo.dto';

@Injectable()
export class CartsRepo extends BaseRepo<ECart> {
  constructor(
    @InjectRepository(ECart) private readonly repo: Repository<ECart>,
  ) {
    super();
  }

  save(createDto: CreateCartDto, auditUser: AuditUser): Promise<ECart> {
    return this.repo.save({
      ...createDto,

      status: CartStatusEnum.new,
      createdBy: auditUser.id,
      updatedBy: auditUser.id,
    });
  }

  findOne(options: FindOneOptions<ECart>): Promise<ECart | null> {
    return this.repo.findOne(options);
  }
}
