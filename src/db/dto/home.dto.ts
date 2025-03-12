import { CategoryDto } from './category.dto';
import { ProductDto } from './product.dto';

export type ProductCarouselDto = {
  category: CategoryDto;
  products: ProductDto[];
};

export type GetHomeDataDto = {
  productCarousels: ProductCarouselDto[];
};
