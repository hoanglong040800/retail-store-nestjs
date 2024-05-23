import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule, DbModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/categories.module';

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,

    // route
    UsersModule,

    AuthModule,

    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
