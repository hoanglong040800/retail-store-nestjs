import { IBase } from './base.interface';

export interface ICategory extends IBase {
  name?: string;
  level?: number;
  icon?: string;
  isLeaf?: boolean;
  displayOrder?: number;

  // ---------- REFERENCE --------
  parentId?: string;
}
