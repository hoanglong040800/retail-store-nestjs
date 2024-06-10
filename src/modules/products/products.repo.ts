import { EProduct } from '@/db/entities';
import { BaseRepo, TryCatch } from '../_base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

export class ProductsRepo extends BaseRepo<EProduct> {
  constructor(
    @InjectRepository(EProduct)
    private readonly repo: Repository<EProduct>,
  ) {
    super();
  }

  @TryCatch()
  async findOne(options: FindOneOptions<EProduct>): Promise<EProduct> {
    const product = await this.repo.findOne(options);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
