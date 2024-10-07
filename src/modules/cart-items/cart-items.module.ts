import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartItemsRepo } from './cart-items.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ECartItem } from '@/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ECartItem])],
  controllers: [CartItemsController],
  providers: [CartItemsService, CartItemsRepo],
  exports: [CartItemsService, CartItemsRepo],
})
export class CartItemsModule {}
