import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EOrder } from '@/db/entities';
import { OrdersRepo } from './orders.repo';
import { CartsModule } from '../carts';

@Module({
  imports: [TypeOrmModule.forFeature([EOrder]), CartsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepo],
  exports: [OrdersService, OrdersRepo],
})
export class OrdersModule {}
