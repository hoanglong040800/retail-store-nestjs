import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule.forRootAsync()],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
