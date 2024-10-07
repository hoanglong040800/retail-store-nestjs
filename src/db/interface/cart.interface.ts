import { CartStatusEnum } from '../enum';
import { IBase } from './base.interface';

export interface ICart extends IBase {
  status?: CartStatusEnum;
  userId?: string;
}
