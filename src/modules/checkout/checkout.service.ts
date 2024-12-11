import { CheckoutBody, MutateCartItem } from '@/db/input';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { SignedTokenUser } from '../auth';
import { CartCalculationDto, CheckoutDto } from '@/db/dto';
import { CustomException } from '@/guard';
import { CartsService } from '../carts';
import { CartItemsService } from '../cart-items';
import { BranchesService } from '../branches';
import { convertCartItemsToMutateCartItems } from '../carts/shared';
import { EBranch } from '@/db/entities';
import { CreateOrderDto } from '../orders/shared';
import { OrderStatusEnum } from '@/db/enum';
import { OrdersService } from '../orders';
import { PaymentsService } from '../payments';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly cartsSrv: CartsService,
    private readonly cartItemSrv: CartItemsService,
    private readonly branchesSrv: BranchesService,
    private readonly ordersSrv: OrdersService,
    private readonly paymentsSrv: PaymentsService,
  ) {}

  // GUIDE: MUST not use try catch because transactional already have try catch to rollback
  @Transactional()
  async checkout(
    body: CheckoutBody,
    user: SignedTokenUser,
  ): Promise<CheckoutDto> {
    if (!body || !user?.id) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        `param cartId, body or user: ${user} not found`,
      );
    }

    const userCart = await this.cartsSrv.getUserCart(user.id);

    const mutateCartItems: MutateCartItem[] = convertCartItemsToMutateCartItems(
      userCart.cartItems,
    );

    if (!mutateCartItems || mutateCartItems.length === 0) {
      throw new CustomException(
        'CANT_CHECKOUT_WITH_EMPTY_CART',
        HttpStatus.BAD_REQUEST,
        `userId: ${user.id}, cartId: ${userCart.id}`,
      );
    }

    await this.cartItemSrv.addMultiCartItems(mutateCartItems, userCart, user);

    const cartCalculation: CartCalculationDto = this.cartsSrv.calculateCart(
      userCart.cartItems,
      {
        deliveryType: body.deliveryType,
      },
    );

    const paymentIntent = await this.paymentsSrv.preAuth({
      amount: cartCalculation.totalAmount,
      orderStatus: OrderStatusEnum.pending,
      paymentMethod: body.paymentMethod,
    });

    const deliveryBranch: EBranch = await this.branchesSrv.getBranchByWardId(
      body.deliveryWardId,
    );

    const orderStatus: OrderStatusEnum = paymentIntent
      ? OrderStatusEnum.awaitingPayment
      : OrderStatusEnum.pending;

    const createOrderDto: CreateOrderDto = {
      userId: user.id,
      cartId: userCart.id,
      deliveryType: body.deliveryType,
      branchId: deliveryBranch.id,
      address: body.address || '',
      status: orderStatus,
      deliveryWardId: body.deliveryWardId,
      paymentMethod: body.paymentMethod,
    };

    const checkoutOrder = await this.ordersSrv.createOrder(
      createOrderDto,
      user,
    );

    if (body.stripePaymentMethodId && paymentIntent) {
      await this.paymentsSrv.charge({
        paymentIntentId: paymentIntent.id,
        paymentMethodId: body.stripePaymentMethodId,
      });

      // TODO continue this
      // await this.ordersSrv.update(checkoutOrder.id, {
      //   status: OrderStatusEnum.awaitingFulfillment,})
    }

    return {
      order: checkoutOrder,
      selectedBranch: deliveryBranch,
    };
  }
}
