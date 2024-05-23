import { Injectable } from '@nestjs/common';
import { CategoriesRepo } from './categories.repo';
import { ECategory } from '@/db/entities';
import { TryCatch } from '../_base';

@Injectable()
export class CategoriesService {
  constructor(private readonly cateRepo: CategoriesRepo) {}

  @TryCatch()
  async findAllByOptions(): Promise<ECategory[]> {
    return this.cateRepo.find({
      select: ['name', 'icon', 'displayOrder'],
      where: {
        level: 1,
      },

      relations: ['childCategories'],
      order: {
        displayOrder: 'ASC',

        childCategories: {
          displayOrder: 'ASC',
        },
      },
    });
  }
}
