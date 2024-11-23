import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { StripeService } from '../stripe';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeSrv: StripeService,
  ) {}

  @Get('stripe')
  async testStripe() {
    const result = await this.stripeSrv.testStripe();
    return result;
  }
}
