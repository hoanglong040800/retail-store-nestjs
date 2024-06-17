import { IBase } from '../interface';

export abstract class BaseDto implements IBase {
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
  id: string;
}
