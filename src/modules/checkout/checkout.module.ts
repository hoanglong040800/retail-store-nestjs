import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CartsModule } from '../carts';
import { CartItemsModule } from '../cart-items';
import { BranchesModule } from '../branches';
import { CheckoutController } from './checkout.controller';

@Module({
  imports: [CartsModule, CartItemsModule, BranchesModule],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
