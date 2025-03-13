import { CategoryDto } from './category.dto';
import { ProductDto } from './product.dto';

export type ProductCarouselDto = {
  category: CategoryDto;
  products: ProductDto[];
};

export type TopProduct = Pick<
  ProductDto,
  'id' | 'name' | 'price' | 'image' | 'unit' | 'category'
>;

export type GetHomeDataDto = {
  productCarousels: ProductCarouselDto[];
};
