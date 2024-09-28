import { AdminDivisionType } from '../enum';
import { IAdminDivision } from '../interface';
import { BaseDto } from './base.dto';

export class AdminDivisionDto extends BaseDto implements IAdminDivision {
  type?: AdminDivisionType;
  name?: string;
  fullname?: string;
  code?: number;
  areaCode?: number;

  parentDivision?: AdminDivisionDto;
  childDivisions?: AdminDivisionDto[];
}
