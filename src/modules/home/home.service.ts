import AppDataSource from '@/config/data-source';
import { GetHomeDataDto, ProductByCateDto } from '@/db/dto/home.dto';
import { ECategory, EProduct } from '@/db/entities';
import { Injectable } from '@nestjs/common';
import { TopCategory } from './shared';
import { CategoriesRepo } from '../categories';
import { In } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(private readonly cateRepo: CategoriesRepo) {}

  async getHomeData(): Promise<GetHomeDataDto> {
    const [productCarousels] = await Promise.all([this.getProductCarousels()]);

    return {
      productCarousels,
    };
  }

  async getProductCarousels(): Promise<ProductByCateDto[]> {
    // Get top 4 categories by total products sold
    const topCategories: TopCategory[] = await AppDataSource.getRepository(
      ECategory,
    )
      .createQueryBuilder('c')
      .select(['c.id as id', 'c.name as name', 'SUM(ci.quantity) as totalSold'])
      .innerJoin('c.products', 'p')
      .innerJoin('p.cartItems', 'ci')
      .groupBy('c.id')
      .addGroupBy('c.name')
      .orderBy('totalSold', 'DESC')
      .limit(4)
      .getRawMany();

    const productCarousels: ProductByCateDto[] =
      await this.getTopProductsByCate(topCategories);

    return productCarousels;
  }

  // For each category, get top 8 products
  async getTopProductsByCate(
    topCate: TopCategory[],
  ): Promise<ProductByCateDto[]> {
    if (!topCate?.length) {
      return [];
    }

    const fullLeafCate: ECategory[] = await this.cateRepo.find({
      relations: {
        parentCategory: true,
      },

      where: {
        id: In(topCate.map((item) => item.id)),
        isLeaf: true,
      },
    });

    const promises: Promise<EProduct[]>[] = topCate.map(async (category) =>
      this.getTopProducts(category.id),
    );

    const topProducts: EProduct[][] = await Promise.all(promises);

    const productCarousels = this.mapCateAndTopProducts(
      topCate,
      fullLeafCate,
      topProducts,
    );

    return productCarousels;
  }

  mapCateAndTopProducts(
    topCate: TopCategory[],
    fullCate: ECategory[],
    topProducts: EProduct[][],
  ) {
    const result: ProductByCateDto[] = topCate.map((cate, index) => {
      const curCate = fullCate.find((i) => i.id === cate.id);
      const producstByCate = topProducts[index];

      if (!curCate) {
        throw new Error('Category not found');
      }

      return {
        category: curCate,
        products: producstByCate,
      };
    });

    return result;
  }

  async getTopProducts(leafCateId: string): Promise<EProduct[]> {
    const rawResult = await AppDataSource.getRepository(EProduct)
      .createQueryBuilder('p')
      .select([
        'p.id AS id',
        'p.name AS name',
        'p.price AS price',
        'p.image AS image',
        'p.unit AS unit',
        'SUM(ci.quantity) AS totalSold',
      ])
      .innerJoin('p.cartItems', 'ci')
      .where('p.leaf_category_id = :categoryId', {
        categoryId: leafCateId,
      })
      .groupBy('p.id, p.name')
      .orderBy('totalSold', 'DESC')
      .limit(8)
      .getRawMany();

    return rawResult;
  }
}
