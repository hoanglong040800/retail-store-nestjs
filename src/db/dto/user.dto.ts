import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IUser } from '../interface';
import { BaseDto } from './base.dto';

export class UserDto extends BaseDto implements IUser {
  @IsNotEmpty()
  email: string;

  firstName?: string;
  lastName?: string;
  cartId?: string;
  branchId?: string;
  deliveryWardId?: string;
  address?: string;

  @Exclude()
  password?: string;

  @Exclude()
  otpCode?: string;

  @Exclude()
  refreshToken?: string;

  @Exclude()
  loginAttempts?: number;

  @Exclude()
  otpSentAt?: Date;
}
