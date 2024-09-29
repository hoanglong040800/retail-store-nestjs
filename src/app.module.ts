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

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,

    // route. should order by name -> swagger show based on name
    ConfigModule,
    AdminDivisionsModule,
    AuthModule,
    BranchesModule,
    CategoryModule,
    ProductsModule,
    UsersModule,
    BranchesAdminDivisionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
