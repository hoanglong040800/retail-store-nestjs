import { HttpStatus, Injectable } from '@nestjs/common';
import { SignedTokenUser } from '../auth';
import { CustomException } from '@/guard';
import { GetUserOrdersDto, UserOrderDto } from '@/db/dto';
import { OrdersRepo } from '../orders';

@Injectable()
export class UsersOrdersService {
  constructor(private readonly ordersRepo: OrdersRepo) {}

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

    const userOrders: UserOrderDto[] =
      await this.ordersRepo.getOrdersByUser(userId);

    return {
      orders: userOrders,
    };
  }
}
