import { EProduct } from '@/db/entities';
import { BaseRepo, TryCatch } from '../_base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CustomException } from '@/guard';
import { HttpStatus } from '@nestjs/common';

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
      throw new CustomException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
