import { IUser } from '../interface';
import { BaseDto } from './base.dto';

export class UserDto extends BaseDto implements IUser {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  refreshToken?: string;
  cartId?: string;
  branchId?: string;
  deliveryWardId?: string;
  address?: string;
}
