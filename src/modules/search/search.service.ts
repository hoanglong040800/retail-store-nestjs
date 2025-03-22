import { GetSearchDto, ProductDto } from '@/db/dto';
import { GetSearchQuery } from '@/db/input';
import { Injectable } from '@nestjs/common';
import { ProductsRepo } from '../products';

@Injectable()
export class SearchService {
  constructor(private readonly productRepo: ProductsRepo) {}

  async getSearchResult(query: GetSearchQuery): Promise<GetSearchDto> {
    const searchProducts = await this.getProductsFromSearchText(
      query.searchText,
    );

    return {
      searchCategories: [],
      searchProducts,
    };
  }

  async getProductsFromSearchText(searchText: string): Promise<ProductDto[]> {
    const products: ProductDto[] =
      await this.productRepo.findByName(searchText);

    return products;
  }
}
