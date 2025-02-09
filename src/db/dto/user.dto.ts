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
}

export class UpdateUserDto implements IUser {
  createdBy?: string;
  updatedBy?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
  branchId?: string;
  deliveryWardId?: string;
}

export class CreateUserDto implements IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
