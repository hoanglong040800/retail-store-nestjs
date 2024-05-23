import { ECategory } from '@/db/entities';
import { BaseRepo, TryCatch } from '@/modules/_base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

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
}
