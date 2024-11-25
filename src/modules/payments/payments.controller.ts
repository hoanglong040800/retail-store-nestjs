import { Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from '../stripe';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeSrv: StripeService,
  ) {}

  @Post('sessions')
  createSession() {
    return this.paymentsService.createSession();
  }

  @Post('payment-intent')
  async createPaymentIntent() {
    const paymentIntent = await this.stripeSrv.createPaymentIntent();
    await this.stripeSrv.confirmPaymentIntent(
      paymentIntent.id,
      'pm_1QOriD07tguiF49Hx18DK2Go',
    );
  }
}
