import { EProduct } from '@/db/entities';
import { BaseRepo, TryCatch } from '../_base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CustomException } from '@/guard';
import { HttpStatus } from '@nestjs/common';
import { mapRawResultToOneEntity } from '@/utils';

export class ProductsRepo extends BaseRepo<EProduct> {
  constructor(
    @InjectRepository(EProduct)
    private readonly repo: Repository<EProduct>,
  ) {
    super();
  }

  find(options?: FindManyOptions<EProduct>): Promise<EProduct[]> {
    return this.repo.find(options);
  }

  @TryCatch()
  async findOne(options: FindOneOptions<EProduct>): Promise<EProduct> {
    const product = await this.repo.findOne(options);

    if (!product) {
      throw new CustomException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  @TryCatch()
  async findByName(
    name: string,
    options: { limit?: number } = {},
  ): Promise<EProduct[]> {
    const formattedName = name.trim();
    const productAlias = 'p';

    if (!formattedName) {
      return [];
    }

    const rawResults = await this.repo
      .createQueryBuilder(productAlias)
      .select([
        'p.id',
        'p.name',
        'p.price',
        'p.leaf_category_id',
        `similarity(
          unaccent(p.name), unaccent('${formattedName}')
        ) AS similarity`,
      ])
      .where(`unaccent(p.name) ILIKE unaccent(:productName)`, {
        productName: `%${formattedName}%`,
      })
      .andWhere('p.active = true')
      .limit(options.limit || 20)
      .orderBy('similarity', 'DESC')
      .getRawMany();

    const entityResult = mapRawResultToOneEntity(
      this.repo,
      rawResults,
      productAlias,
    );

    return entityResult;
  }
}
