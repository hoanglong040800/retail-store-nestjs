import { ECategory } from '@/db/entities';
import { BaseRepo, TryCatch } from '@/modules/_base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export class CategoriesRepo extends BaseRepo<ECategory> {
  constructor(
    @InjectRepository(ECategory)
    private readonly repo: Repository<ECategory>,
  ) {
    super();
  }

  @TryCatch()
  find(options?: FindManyOptions<ECategory>) {
    return this.repo.find(options);
  }

  @TryCatch()
  // todo decorator catch null options, null value throw error
  async findOne(options: FindOneOptions<ECategory>): Promise<ECategory> {
    if (!options) {
      throw new Error('Options is empty');
    }

    const category = await this.repo.findOne({
      ...options,
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }
}
