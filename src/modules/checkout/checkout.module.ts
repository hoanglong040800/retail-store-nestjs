import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CartsModule } from '../carts';
import { CartItemsModule } from '../cart-items';
import { BranchesModule } from '../branches';
import { CheckoutController } from './checkout.controller';
import { OrdersModule } from '../orders';
import { PaymentsModule } from '@/modules/payments';
import { UsersModule } from '../users';

@Module({
  imports: [
    CartsModule,
    CartItemsModule,
    BranchesModule,
    OrdersModule,
    PaymentsModule,
    UsersModule,
  ],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
