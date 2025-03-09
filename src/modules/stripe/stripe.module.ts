import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ENV } from '@/constants';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    const stripeProvider: Provider = {
      provide: ENV.stripe.secretKey,
      useFactory: () => ENV.stripe.secretKey,
    };

    const providers: Provider[] = [StripeService, stripeProvider];

    return {
      module: StripeModule,
      providers,
      exports: [StripeService],
    };
  }
}
