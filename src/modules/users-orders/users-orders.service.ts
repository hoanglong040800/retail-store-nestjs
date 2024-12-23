import { HttpStatus, Injectable } from '@nestjs/common';
import { SignedTokenUser } from '../auth';
import { CustomException } from '@/guard';
import { CartCalculationDto, GetUserOrdersDto, UserOrderDto } from '@/db/dto';
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

  async getOrdersByUser(
    userId: string,
    auditUser: SignedTokenUser,
  ): Promise<GetUserOrdersDto> {
    // TODO move to util
    if (userId !== auditUser.id) {
      throw new CustomException(
        'PARAMS_NOT_MATCH_WITH_TOKEN',
        HttpStatus.UNAUTHORIZED,
        `userId: ${userId} !== auditUser.id: ${auditUser.id}`,
      );
    }

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
}
