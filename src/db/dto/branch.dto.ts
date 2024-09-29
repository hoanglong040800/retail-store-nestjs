import { IBranch } from '../interface';
import { AdminDivisionDto } from './admin-division.dto';
import { BaseDto } from './base.dto';

export class BranchDto extends BaseDto implements IBranch {
  isActive?: boolean;
  name?: string;
  ward?: AdminDivisionDto;
}
