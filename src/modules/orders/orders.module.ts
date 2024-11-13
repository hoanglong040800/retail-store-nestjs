import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EOrder } from '@/db/entities';
import { OrdersRepo } from './orders.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EOrder])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepo],
  exports: [OrdersService, OrdersRepo],
})
export class OrdersModule {}
