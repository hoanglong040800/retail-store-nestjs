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

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,

    // route. should order by name -> swagger show based on name
    CartsModule,
    ConfigModule,
    AdminDivisionsModule,
    AuthModule,
    BranchesModule,
    CategoryModule,
    ProductsModule,
    UsersModule,
    BranchesAdminDivisionModule,
    CartItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
