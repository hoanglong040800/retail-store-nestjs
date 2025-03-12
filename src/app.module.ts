import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule, DbModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ConfigModule } from './modules/config/config.module';
import { ProductsModule } from './modules/products/products.module';
import { BranchesModule } from './modules/branches';
import { AdminDivisionsModule } from './modules/admin-divisions';
import { BranchesAdminDivisionModule } from './modules/branches-admin-divisions';
import { CartsModule } from './modules/carts/carts.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { CheckoutModule } from './modules/checkout';
import { OrdersModule } from './modules/orders/orders.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersOrdersModule } from './modules/users-orders/users-orders.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,

    // route. should order by name -> swagger show based on order
    CheckoutModule,
    UsersOrdersModule,
    PaymentsModule,
    AuthModule,
    AdminDivisionsModule,
    BranchesAdminDivisionModule,
    BranchesModule,
    CartsModule,
    CartItemsModule,
    ConfigModule,
    CategoryModule,
    OrdersModule,
    ProductsModule,
    UsersModule,
    StripeModule.forRootAsync(),
    HomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
