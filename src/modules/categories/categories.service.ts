import { Injectable } from '@nestjs/common';
import { CategoriesRepo } from './categories.repo';
import { ECategory } from '@/db/entities';
import { TryCatch } from '../_base';
import { ICategory } from '@/db/interface';

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

  async findOneByOptions({ id, isLeaf }: ICategory): Promise<ECategory> {
    return this.cateRepo.findOne({
      relations: ['childCategories', 'products', 'childCategories.products'],

      where: {
        id,
        isLeaf,
      },

      order: {
        displayOrder: 'ASC',

        childCategories: {
          displayOrder: 'ASC',
        },
      },
    });
  }
}
