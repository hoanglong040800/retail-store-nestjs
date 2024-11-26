import { Injectable } from '@nestjs/common';
import { OrdersRepo } from './orders.repo';
import { CreateOrderDto } from './shared';
import { AuditUser, EOrder } from '@/db/entities';
import { CartsService } from '../carts';
import { CartStatusEnum } from '@/db/enum';
import { Propagation, Transactional } from 'typeorm-transactional';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repo: OrdersRepo,
    private readonly cartsSrv: CartsService,
  ) {}

  @Transactional({
    propagation: Propagation.REQUIRED,
  })
  async createOrder(
    createOrderDto: CreateOrderDto,
    auditUser: AuditUser,
  ): Promise<EOrder> {
    const order = await this.repo.save(createOrderDto, auditUser);

    await this.cartsSrv.updateCart(
      {
        id: createOrderDto.cartId,
        status: CartStatusEnum.checkout,
      },

      auditUser,
    );

    await this.cartsSrv.getOrCreateUserCart({
      userId: createOrderDto.userId,
    });

    return order;
  }
}
