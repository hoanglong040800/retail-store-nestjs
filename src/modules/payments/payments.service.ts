import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeSrv: StripeService) {}

  createSession() {
    return this.stripeSrv.createCheckoutSession();
  }
}
