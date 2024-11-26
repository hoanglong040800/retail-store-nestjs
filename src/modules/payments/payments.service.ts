import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';

// TODO make this as abstract class
@Injectable()
export class PaymentsService {
  constructor(private readonly stripeSrv: StripeService) {}

  async preAuth({ amount }: { amount: number }) {
    return await this.stripeSrv.createPaymentIntent({ amount });
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
