import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule, DbModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ConfigModule } from './modules/config/config.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
