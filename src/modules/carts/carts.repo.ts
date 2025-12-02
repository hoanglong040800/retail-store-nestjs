import { AuditUser, ECart } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import {
  BaseRepo,
  RepoCreatePayload,
  RepoUpdatePayload,
} from '@/modules/_base';
import { CartStatusEnum } from '@/db/enum';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomException } from '@/guard';

@Injectable()
export class CartsRepo extends BaseRepo<ECart> {
  constructor(
    @InjectRepository(ECart) private readonly repo: Repository<ECart>,
  ) {
    super();
  }

  save(
    createPayload: RepoCreatePayload<ECart>,
    auditUser: AuditUser,
  ): Promise<ECart> {
    return this.repo.save({
      ...createPayload,

      status: CartStatusEnum.new,
      createdBy: auditUser.id,
      updatedBy: auditUser.id,
    });
  }

  findOne(options: FindOneOptions<ECart>): Promise<ECart | null> {
    return this.repo.findOne(options);
  }

  async update(
    id: string,
    updatePayload: RepoUpdatePayload<ECart>,
    auditUser: AuditUser,
  ): Promise<ECart> {
    const updateResult: UpdateResult = await this.repo.update(id, {
      ...updatePayload,
      updatedBy: auditUser.id,
    });

    const updatedRecord = await this.findOne({
      where: {
        id,
      },
    });

    if (!updateResult.affected || !updatedRecord) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return updatedRecord;
  }
}
