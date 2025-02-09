import { StringFieldOptional, UUIDFieldOptional } from '@/decorators';
import { IUser } from '../interface';
import { BaseDto } from './base.dto';
import { IsEmail } from 'class-validator';

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

  @StringFieldOptional()
  @IsEmail()
  email?: string;

  @StringFieldOptional()
  firstName?: string;

  @StringFieldOptional()
  lastName?: string;

  @StringFieldOptional()
  refreshToken?: string;

  @UUIDFieldOptional()
  branchId?: string;

  @UUIDFieldOptional()
  deliveryWardId?: string;
}

export class CreateUserDto implements IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
