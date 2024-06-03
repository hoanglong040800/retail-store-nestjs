import { IBase } from './base.interface';

export interface IProduct extends IBase {
  barcode?: string;
  name?: string;
  description?: string;
  active?: boolean;
  price?: number;
  image?: string;

  // REFERENCES
  leafCategoryId?: string;
}
