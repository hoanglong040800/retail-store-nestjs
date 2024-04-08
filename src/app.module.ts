import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule, DbModule } from './config';

@Module({
  imports: [
    // core
    AppConfigModule,
    DbModule,

    // route
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
