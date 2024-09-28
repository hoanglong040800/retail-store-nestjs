import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule, DbModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ConfigModule } from './modules/config/config.module';
import { ProductsModule } from './modules/products/products.module';
import { BranchesModule } from './modules/branches';

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,
    ConfigModule,

    // route
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    BranchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
