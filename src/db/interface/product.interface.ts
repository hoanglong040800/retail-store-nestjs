import { ProductUnitEnum } from '../enum';
import { IBase } from './base.interface';

export interface IProduct extends IBase {
  barcode?: string;
  name?: string;
  description?: string;
  active?: boolean;
  price?: number;
  image?: string;
  unit?: ProductUnitEnum;

  // REFERENCES
  leafCategoryId?: string;
}
