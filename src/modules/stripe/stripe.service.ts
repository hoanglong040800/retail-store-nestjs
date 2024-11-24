import { ENV } from '@/constants';
import { CustomException } from '@/guard';
import { HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { TryCatch } from '../_base';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(ENV.stripe.secretKey, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  @TryCatch()
  async createCheckoutSession(): Promise<string> {
    const session: Stripe.Response<Stripe.Checkout.Session> =
      await this.stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'vnd',
              product_data: {
                name: 'T-Shirt',
              },
              unit_amount: 20000,
            },
          },
        ],
        mode: 'payment',
        currency: 'vnd',
        success_url: 'http://localhost:8081/success',
        cancel_url: 'http://localhost:8081/cancel',
      });

    if (!session.url) {
      throw new CustomException(
        'CANT_CREATE_CHECKOUT_SESSION_STRIPE',
        HttpStatus.BAD_REQUEST,
      );
    }

    return session.url;
  }
}
