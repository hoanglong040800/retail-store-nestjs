import { CategoryDto } from './category.dto';
import { ProductDto } from './product.dto';

export type ProductByCateDto = {
  category: CategoryDto;
  products: TopProduct[];
};

export type TopProduct = Pick<
  ProductDto,
  'id' | 'name' | 'price' | 'image' | 'unit' | 'category'
>;

export type GetHomeDataDto = {
  productCarousels: ProductByCateDto[];
};
