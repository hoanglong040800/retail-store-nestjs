import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseRepo } from '../_base';
import { AuditUser, ECartItem } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUpdateCartItemDto } from './cart-items-repo.dto';
import { CustomException } from '@/guard';

@Injectable()
export class CartItemsRepo extends BaseRepo<ECartItem> {
  constructor(
    @InjectRepository(ECartItem)
    private readonly repo: Repository<ECartItem>,
  ) {
    super();
  }

  save(
    createDto: CreateUpdateCartItemDto,
    auditUser: AuditUser,
  ): Promise<ECartItem> {
    return this.repo.save({
      ...createDto,
      createdBy: auditUser.id,
      updatedBy: auditUser.id,
    });
  }

  findOne(options: FindOneOptions<ECartItem>): Promise<ECartItem | null> {
    return this.repo.findOne(options);
  }

  async update(
    id: string,
    updateDto: CreateUpdateCartItemDto,
    auditUser: AuditUser,
  ): Promise<ECartItem> {
    const updateResult: UpdateResult = await this.repo.update(id, {
      ...updateDto,
      updatedBy: auditUser.id,
    });

    if (!updateResult.affected) {
      throw new CustomException('CART_ITEM_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedRecord = await this.findOne({
      where: {
        id,
      },
    });

    if (!updatedRecord) {
      throw new CustomException('CART_ITEM_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return updatedRecord;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult: DeleteResult = await this.repo.delete(id);

    if (!!deleteResult.affected) {
      return false;
    }

    return true;
  }
}
