import { AuditUser, ECart } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { BaseRepo } from '@/modules/_base';
import { CartStatusEnum } from '@/db/enum';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './shared/carts-repo.dto';
import { CustomException } from '@/guard';

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

  async update(
    id: string,
    updateDto: UpdateCartDto,
    auditUser: AuditUser,
  ): Promise<ECart> {
    const updateResult: UpdateResult = await this.repo.update(
      id || updateDto.id,
      {
        ...updateDto,
        updatedBy: auditUser.id,
      },
    );

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
