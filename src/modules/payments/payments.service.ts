import { HttpStatus, Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';
import {
  OrderStatusEnum,
  PaymentActionEnum,
  PaymentMethodEnum,
} from '@/db/enum';
import { checkCanProcessPayment } from './shared';
import { CustomException } from '@/guard';

// TODO make this as abstract class
@Injectable()
export class PaymentsService {
  constructor(private readonly stripeSrv: StripeService) {}

  async preAuth({
    amount,
    paymentMethod,
    orderStatus,
  }: {
    amount: number;
    paymentMethod: PaymentMethodEnum;
    orderStatus: OrderStatusEnum;
  }) {
    const isCanProcessPayment = checkCanProcessPayment(
      paymentMethod,
      orderStatus,
      PaymentActionEnum.preAuth,
    );

    if (!isCanProcessPayment) {
      throw new CustomException('CANT_PRE_AUTH', HttpStatus.BAD_REQUEST);
    }

    const paymentIntent = await this.stripeSrv.createPaymentIntent({ amount });
    return paymentIntent;
  }

  async charge({
    paymentIntentId,
    paymentMethodId,
  }: {
    paymentIntentId: string;
    paymentMethodId: string;
  }) {
    return await this.stripeSrv.confirmPaymentIntent(
      paymentIntentId,
      paymentMethodId,
    );
  }
}
