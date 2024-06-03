import { IProduct } from '../interface';
import { CategoryDto } from './category.dto';

export class ProductDto implements IProduct {
  barcode?: string;
  name?: string;
  description?: string;
  active?: boolean;
  price?: number;
  image?: string;

  category?: CategoryDto;
}
