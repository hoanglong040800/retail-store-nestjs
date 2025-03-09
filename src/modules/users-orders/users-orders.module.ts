import { Module } from '@nestjs/common';
import { UsersOrdersService } from './users-orders.service';
import { UsersOrdersController } from './users-orders.controller';
import { OrdersModule } from '../orders';
import { CartsModule } from '../carts';

@Module({
  imports: [OrdersModule, CartsModule],
  controllers: [UsersOrdersController],
  providers: [UsersOrdersService],
})
export class UsersOrdersModule {}
