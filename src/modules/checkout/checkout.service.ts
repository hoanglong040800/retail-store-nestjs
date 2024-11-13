import { CheckoutBody, MutateCartItem } from '@/db/input';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { SignedTokenUser } from '../auth';
import { CheckoutDto } from '@/db/dto';
import { CustomException } from '@/guard';
import { CartsService } from '../carts';
import { CartItemsService } from '../cart-items';
import { BranchesService } from '../branches';
import { convertCartItemsToMutateCartItems } from '../carts/shared';
import { EBranch } from '@/db/entities';
import { CreateOrderDto } from '../orders/shared';
import { OrderStatusEnum } from '@/db/enum';
import { OrdersService } from '../orders';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly cartsSrv: CartsService,
    private readonly cartItemSrv: CartItemsService,
    private readonly branchesSrv: BranchesService,
    private readonly ordersSrv: OrdersService,
  ) {}

  // GUIDE: MUST not use try catch because transactional already have try catch to rollback
  @Transactional()
  async checkout(
    cartId: string,
    body: CheckoutBody,
    user: SignedTokenUser,
  ): Promise<CheckoutDto> {
    if (!cartId || !body || !user?.id) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `param cartId, body or user: ${user} not found`,
      );
    }

    const userCart = await this.cartsSrv.getUserCart(cartId, user.id);

    const mutateCartItems: MutateCartItem[] = convertCartItemsToMutateCartItems(
      userCart.cartItems,
    );

    await this.cartItemSrv.addMultiCartItems(mutateCartItems, userCart, user);

    this.cartsSrv.calculateCart(userCart.cartItems, {
      deliveryType: body.deliveryType,
    });

    const deliveryBranch: EBranch = await this.branchesSrv.getBranchByWardId(
      body.deliveryWardId,
    );

    const createOrderDto: CreateOrderDto = {
      userId: user.id,
      cartId: userCart.id,
      deliveryType: body.deliveryType,
      branchId: deliveryBranch.id,
      address: body.address || '',
      status: OrderStatusEnum.pending,
      deliveryWardId: body.deliveryWardId,
    };

    const checkoutOrder = await this.ordersSrv.createOrder(
      createOrderDto,
      user,
    );

    return {
      order: checkoutOrder,
    };
  }
}
