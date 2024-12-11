import { AuditUser, EOrder } from '@/db/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { BaseRepo } from '../_base';
import { CreateOrderDto, UpdateOrderDto } from './shared';
import { CustomException } from '@/guard';

@Injectable()
export class OrdersRepo extends BaseRepo<EOrder> {
  constructor(
    @InjectRepository(EOrder)
    private readonly repo: Repository<EOrder>,
  ) {
    super();
  }

  findOne(options: FindOneOptions<EOrder>): Promise<EOrder | null> {
    return this.repo.findOne(options);
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

  async update(
    id: string,
    updateDto: UpdateOrderDto,
    auditUser: AuditUser,
  ): Promise<EOrder> {
    if (!id || !updateDto) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.BAD_REQUEST,
        `id: ${id} or updateDto: ${updateDto} not found`,
      );
    }

    const updateResult: UpdateResult = await this.repo.update(id, {
      ...updateDto,
      updatedBy: auditUser.id,
    });

    if (!updateResult.affected) {
      throw new CustomException('ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedRecord = await this.findOne({ where: { id } });

    if (!updatedRecord) {
      throw new CustomException('ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return updatedRecord;
  }
}
