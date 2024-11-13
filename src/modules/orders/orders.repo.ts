import { AuditUser, EOrder } from '@/db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepo } from '../_base';
import { CreateOrderDto } from './shared';

@Injectable()
export class OrdersRepo extends BaseRepo<EOrder> {
  constructor(
    @InjectRepository(EOrder)
    private readonly repo: Repository<EOrder>,
  ) {
    super();
  }

  save(createDto: CreateOrderDto, auditUser: AuditUser): Promise<EOrder> {
    return this.repo.save({
      ...createDto,
      userId: createDto.userId,
      branchId: createDto.branchId,
      deliveryWardId: createDto.deliveryWardId,
      createdBy: auditUser.id,
      updatedBy: auditUser.id,
    });
  }
}
