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
import { EOrder } from '@/db/entities';
import { CreateOrderDto } from '../orders/shared';
import { OrderStatusEnum, PaymentMethodEnum } from '@/db/enum';
import { OrdersService } from '../orders';
import { PaymentsService } from '../payments';
import { getOrderStatus } from '../orders/shared/orders.utils';
import Stripe from 'stripe';
import { UsersService } from '../users';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly cartsSrv: CartsService,
    private readonly cartItemSrv: CartItemsService,
    private readonly branchesSrv: BranchesService,
    private readonly ordersSrv: OrdersService,
    private readonly paymentsSrv: PaymentsService,
    private readonly usersSrv: UsersService,
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

    const [userCart, deliveryBranch] = await Promise.all([
      this.cartsSrv.getUserCart(user.id),

      this.branchesSrv.getBranchByWardId(body.deliveryWardId),
    ]);

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

    await Promise.all([
      this.usersSrv.update(
        user.id,
        {
          deliveryWardId: body.deliveryWardId,
          branchId: deliveryBranch.id,
        },
        user,
      ),

      this.cartItemSrv.addMultiCartItems(mutateCartItems, userCart, user),
    ]);

    const cartCalculation: CartCalculationDto = this.cartsSrv.calculateCart(
      userCart.cartItems,
      {
        deliveryType: body.deliveryType,
      },
    );

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> | null =
      await this.paymentsSrv.preAuth({
        amount: cartCalculation.totalAmount,
        orderStatus: OrderStatusEnum.pending,
        paymentMethod: body.paymentMethod,
      });

    const orderStatus: OrderStatusEnum = getOrderStatus({
      curStatus: OrderStatusEnum.pending,
      paymentMethod: body.paymentMethod,
    });

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

    const orderAfterCharge: EOrder | null = await this.chargeAfterCheckout({
      orderId: checkoutOrder.id,
      curStatus: orderStatus,
      paymentMethod: body.paymentMethod,
      auditUser: user,
      paymentIntentId: paymentIntent?.id,
      stripePaymentMethodId: body.stripePaymentMethodId,
    });

    return {
      order: orderAfterCharge || checkoutOrder,
      selectedBranch: deliveryBranch,
    };
  }

  async chargeAfterCheckout({
    orderId,
    curStatus,
    paymentMethod,
    auditUser,
    paymentIntentId,
    stripePaymentMethodId,
  }: {
    orderId: string;
    curStatus: OrderStatusEnum;
    paymentMethod: PaymentMethodEnum;
    auditUser: SignedTokenUser;
    paymentIntentId?: string;
    stripePaymentMethodId?: string;
  }): Promise<EOrder | null> {
    if (
      !orderId ||
      !curStatus ||
      !paymentMethod ||
      !auditUser ||
      !stripePaymentMethodId ||
      !paymentIntentId
    ) {
      return null;
    }

    await this.paymentsSrv.charge({
      paymentIntentId,
      paymentMethodId: stripePaymentMethodId,
    });

    const newOrder: EOrder = await this.ordersSrv.updateOrderStatus({
      orderId,
      curStatus,
      paymentMethod,
      auditUser,
    });

    return newOrder;
  }
}
