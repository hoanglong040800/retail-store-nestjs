import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ECategory } from '@/db/entities';
import { CategoriesRepo } from './categories.repo';

@Module({
  imports: [TypeOrmModule.forFeature([ECategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepo],
  exports: [CategoriesService, CategoriesRepo],
})
export class CategoryModule {}
