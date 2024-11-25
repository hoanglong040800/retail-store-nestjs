import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeSrv: StripeService) {}

  async createSession() {
    return await this.stripeSrv.createCheckoutSession();
  }
}
