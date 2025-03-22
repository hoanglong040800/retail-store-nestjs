import { CategoryDto } from './category.dto';
import { ProductDto } from './product.dto';

export class GetSearchDto {
  searchCategories: CategoryDto[];
  searchProducts: ProductDto[];
}
