import { ENV } from '@/constants';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(ENV.stripe.secretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async testStripe() {
    const result = await this.stripe.customers.retrieve('cus_RGtH4NdLPGntOK');
    return result;
  }
}
