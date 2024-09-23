import { IBase } from './base.interface';

export interface IBranch extends IBase {
  isActive?: boolean;

  // ---------- REFERENCE --------
  wardId?: boolean;
}
