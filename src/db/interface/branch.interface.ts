import { IBase } from './base.interface';

export interface IBranch extends IBase {
  isActive?: boolean;
  name?: string;

  // ---------- REFERENCE --------
  wardId?: string;
  districtId?: string;
  provinceId?: string;
}
