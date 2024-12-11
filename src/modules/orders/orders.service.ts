import { HttpStatus, Injectable } from '@nestjs/common';
import { OrdersRepo } from './orders.repo';
import { CreateOrderDto } from './shared';
import { AuditUser, EOrder } from '@/db/entities';
import { CartsService } from '../carts';
import {
  CartStatusEnum,
  OrderActionEnum,
  OrderStatusEnum,
  PaymentMethodEnum,
} from '@/db/enum';
import { Propagation, Transactional } from 'typeorm-transactional';
import { CustomException } from '@/guard';
import { getOrderStatus } from './shared/orders.utils';

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

  async updateOrderStatus({
    orderId,
    auditUser,
    curStatus,
    orderAction,
    paymentMethod,
  }: {
    orderId: string;
    auditUser: AuditUser;
    curStatus: OrderStatusEnum;
    orderAction: OrderActionEnum;
    paymentMethod: PaymentMethodEnum;
  }) {
    if (!orderId || !auditUser || !curStatus || !orderAction) {
      throw new CustomException('PARAMS_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const newOrderStatus = getOrderStatus({
      curStatus,
      action: orderAction,
      paymentMethod,
    });

    return this.repo.update(
      orderId,
      {
        status: newOrderStatus,
      },
      auditUser,
    );
  }
}
