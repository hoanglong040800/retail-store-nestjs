import { Module } from '@nestjs/common';
import { UsersOrdersService } from './users-orders.service';
import { UsersOrdersController } from './users-orders.controller';

@Module({
  controllers: [UsersOrdersController],
  providers: [UsersOrdersService],
})
export class UsersOrdersModule {}
