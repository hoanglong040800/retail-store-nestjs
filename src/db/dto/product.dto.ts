import { ProductUnitEnum } from '../enum';
import { IProduct } from '../interface';
import { BaseDto } from './base.dto';
import { CategoryDto } from './category.dto';

export class ProductDto extends BaseDto implements IProduct {
  barcode?: string;
  name?: string;
  description?: string;
  active?: boolean;
  price?: number;
  image?: string;
  unit?: ProductUnitEnum;

  category?: CategoryDto;
}
