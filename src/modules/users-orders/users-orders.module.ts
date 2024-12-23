import { Module } from '@nestjs/common';
import { UsersOrdersService } from './users-orders.service';
import { UsersOrdersController } from './users-orders.controller';
import { OrdersModule } from '../orders';

@Module({
  imports: [OrdersModule],
  controllers: [UsersOrdersController],
  providers: [UsersOrdersService],
})
export class UsersOrdersModule {}
