import { ICategory } from '../interface';
import { BaseDto } from './base.dto';
import { ProductDto } from './product.dto';

export class CategoryDto extends BaseDto implements ICategory {
  name?: string;
  level: number;
  icon?: string;
  isLeaf: boolean;
  displayOrder?: number;

  parentCategories?: CategoryDto;
  childCategories?: CategoryDto[];
  products?: ProductDto[];
}
