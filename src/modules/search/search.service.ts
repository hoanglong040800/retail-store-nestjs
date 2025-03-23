import { GetSearchDto } from '@/db/dto';
import { GetSearchQuery } from '@/db/input';
import { Injectable } from '@nestjs/common';
import { ProductsRepo } from '../products';
import { CategoriesRepo } from '../categories';
import { In } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    private readonly productRepo: ProductsRepo,
    private readonly cateRepo: CategoriesRepo,
  ) {}

  async getSearchResult(query: GetSearchQuery): Promise<GetSearchDto> {
    const defaultResult: GetSearchDto = {
      searchCategories: [],
      searchProducts: [],
    };

    if (!query?.searchText) {
      return defaultResult;
    }

    const searchProducts = await this.productRepo.findByName(query.searchText);

    if (!searchProducts?.length) {
      return defaultResult;
    }

    const searchCateIds: string[] = searchProducts.map(
      (item) => item.leafCategoryId,
    );

    const searchCategories = await this.cateRepo.find({
      relations: {
        parentCategory: true,
      },
      where: {
        id: In(searchCateIds),
      },
    });

    return {
      searchCategories,
      searchProducts,
    };
  }
}
