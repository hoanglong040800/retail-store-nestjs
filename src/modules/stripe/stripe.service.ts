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
          {
            quantity: 1,
            price_data: {
              currency: 'vnd',
              product_data: {
                name: 'Shorts',
              },
              unit_amount: 50000,
            },
          },
        ],

        mode: 'payment',
        ui_mode: 'embedded',
        currency: 'vnd',
        return_url: 'http://localhost:',
      });

    if (!session.client_secret) {
      throw new CustomException(
        'CANT_CREATE_CHECKOUT_SESSION_STRIPE',
        HttpStatus.BAD_REQUEST,
      );
    }

    return session.client_secret;
  }

  async createPaymentIntent({ amount }: { amount: number }) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'vnd',
      payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: false,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new CustomException(
        'CANT_CREATE_PAYMENT_INTENT_STRIPE',
        HttpStatus.BAD_REQUEST,
      );
    }

    return paymentIntent;
  }

  async confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string) {
    const result = await this.stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    return result;
  }
}
