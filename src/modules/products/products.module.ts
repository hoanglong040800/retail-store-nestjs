import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EProduct } from '@/db/entities';
import { ProductsRepo } from './products.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EProduct])],

  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepo],
  exports: [ProductsService, ProductsRepo],
})
export class ProductsModule {}
