import { ECategory } from '@/db/entities';
import { CustomException } from '@/guard';
import { BaseRepo, TryCatch } from '@/modules/_base';
import { HttpStatus } from '@nestjs/common';
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
      throw new CustomException(
        'INVALID_DATA',
        HttpStatus.BAD_REQUEST,
        'options is empty',
      );
    }

    const category = await this.repo.findOne({
      ...options,
    });

    if (!category) {
      throw new CustomException('CATEGORY_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
