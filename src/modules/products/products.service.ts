import { Injectable } from '@nestjs/common';
import { ProductsRepo } from './products.repo';
import { IProduct } from '@/db/interface';
import { ProductsRlt } from '@/constants';
import { EProduct } from '@/db/entities';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepo) {}

  async findOne(id: string, options?: IProduct): Promise<EProduct> {
    return this.productRepo.findOne({
      relations: [ProductsRlt.category, ProductsRlt.categoryParentCategory],

      where: {
        ...(options || {}),
        id,
      },
    });
  }
}
