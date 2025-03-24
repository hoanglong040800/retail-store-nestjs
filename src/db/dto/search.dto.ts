import { IProduct } from '../interface';
import { CategoryDto } from './category.dto';

export class SearchProductDto implements IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  leafCategoryId: string;
  similarity: number;
}

export class GetSearchDto {
  searchCategories: CategoryDto[];
  searchProducts: SearchProductDto[];
}
