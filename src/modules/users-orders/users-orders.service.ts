import { HttpStatus, Injectable } from '@nestjs/common';
import { SignedTokenUser } from '../auth';
import { CustomException } from '@/guard';
import {
  CartCalculationDto,
  GetUserOrderDetailDto,
  GetUserOrdersDto,
  UserOrderDto,
} from '@/db/dto';
import { OrdersRepo } from '../orders';
import { CartsService } from '../carts';
import { ECartItem } from '@/db/entities';
import { DeliveryTypeEnum } from '@/db/enum';

@Injectable()
export class UsersOrdersService {
  constructor(
    private readonly ordersRepo: OrdersRepo,
    private readonly cartsSrv: CartsService,
  ) {}

  checkUserMatchToken(
    paramUserId: string,
    auditUser: SignedTokenUser,
  ): boolean {
    if (!paramUserId && !auditUser) {
      return true;
    }

    const isParamNull = !paramUserId && auditUser;
    const isParamDifferentFromAudit = paramUserId !== auditUser.id;

    if (isParamNull || isParamDifferentFromAudit) {
      throw new CustomException(
        'PARAMS_NOT_MATCH_WITH_TOKEN',
        HttpStatus.UNAUTHORIZED,
        `userId: ${paramUserId} !== auditUser.id: ${auditUser.id}`,
      );
    }

    return true;
  }

  async getOrdersByUser(
    userId: string,
    auditUser: SignedTokenUser,
  ): Promise<GetUserOrdersDto> {
    this.checkUserMatchToken(userId, auditUser);

    const userOrders = await this.ordersRepo.getOrdersByUser(userId);

    const calculatedUserOrders: UserOrderDto[] = userOrders.map((order) => {
      const cartCalculation: CartCalculationDto = this.cartsSrv.calculateCart(
        order.cart?.cartItems as ECartItem[],
        {
          deliveryType: order.deliveryType as DeliveryTypeEnum,
        },
      );

      const curOrder: UserOrderDto = {
        ...order,
        cart: {
          ...order.cart,
          calculation: cartCalculation,
        },
      };

      return curOrder;
    });

    return {
      orders: calculatedUserOrders,
    };
  }

  async getOrderById({
    userId,
    orderId,
    auditUser,
  }: {
    userId: string;
    orderId: string;
    auditUser: SignedTokenUser;
  }): Promise<GetUserOrderDetailDto> {
    this.checkUserMatchToken(userId, auditUser);

    const userOrder = await this.ordersRepo.getOrderByUser({
      userId,
      orderId,
    });

    if (!userOrder) {
      throw new CustomException('ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return {
      order: userOrder,
    };
  }
}
