import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule, DbModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ConfigModule } from './modules/config/config.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,

    // route
    UsersModule,

    AuthModule,

    CategoryModule,

    ConfigModule,

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
