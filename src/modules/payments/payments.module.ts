import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule.forRootAsync()],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
