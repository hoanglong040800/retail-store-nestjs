import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsRepo } from './cart-items.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ECartItem } from '@/db/entities';
import { ProductsModule } from '../products';

@Module({
  imports: [TypeOrmModule.forFeature([ECartItem]), ProductsModule],
  providers: [CartItemsService, CartItemsRepo],
  exports: [CartItemsService, CartItemsRepo],
})
export class CartItemsModule {}
