import { AuditUser, EOrder } from '@/db/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseRepo } from '../_base';
import { CreateOrderDto, UpdateOrderDto } from './shared';
import { CustomException } from '@/guard';
import { UserOrderDto } from '@/db/dto';

@Injectable()
export class OrdersRepo extends BaseRepo<EOrder> {
  constructor(
    @InjectRepository(EOrder)
    private readonly repo: Repository<EOrder>,
  ) {
    super();
  }

  find(options?: FindManyOptions<EOrder>): Promise<EOrder[]> {
    return this.repo.find(options);
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

  async getOrdersByUser(userId: string): Promise<UserOrderDto[]> {
    if (!userId) {
      return [];
    }

    const userOrders: EOrder[] = await this.find({
      select: {
        id: true,
        createdAt: true,
        deliveryType: true,
        status: true,

        cart: {
          id: true,
          cartItems: {
            totalPrice: true,
            productId: true,
          },
        },
      },

      relations: {
        cart: {
          cartItems: true,
        },
      },

      where: {
        userId,
      },
    });

    return userOrders as UserOrderDto[];
  }
}
