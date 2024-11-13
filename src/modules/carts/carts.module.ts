import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsRepo } from './carts.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ECart } from '@/db/entities';
import { CartItemsModule } from '@/modules/cart-items';
import { CartsController } from './carts.controller';
import { BranchesModule } from '../branches';

@Module({
  imports: [TypeOrmModule.forFeature([ECart]), CartItemsModule, BranchesModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepo],
  exports: [CartsService], // not export CartRepo. Only allow using via CartsService -> avoid dup carts by only using service to ensure business is kept
})
export class CartsModule {}
