import { ICategory } from '../interface';
import { BaseDto } from './base.dto';

export class CategoryDto extends BaseDto implements ICategory {
  name?: string;
  level: number;
  icon?: string;
  isLeaf: boolean;
  displayOrder?: number;
  parentId?: string;
  parentCategories?: CategoryDto;
  childCategories?: CategoryDto[];
}
