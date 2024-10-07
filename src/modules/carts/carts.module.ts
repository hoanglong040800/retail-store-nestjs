import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepo } from './carts.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ECart } from '@/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ECart])],
  controllers: [CartsController],
  providers: [CartsService, CartsRepo],
  exports: [CartsService], // not export CartRepo. Only allow using via CartsService -> avoid dup carts by only using service to ensure business is kept
})
export class CartsModule {}
