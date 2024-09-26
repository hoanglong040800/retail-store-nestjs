import { AdminDivisionType } from '../enum';
import { IBase } from './base.interface';

export interface IAdminDivision extends IBase {
  type?: AdminDivisionType;
  name?: string;
  fullname?: string;
  code?: number;
  areaCode?: number;

  // ---------- REFERENCE --------
  parentId?: string;
}
