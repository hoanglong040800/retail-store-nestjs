import { UserRoleEnum } from '../enum/user.enum';
import { IBase } from './base.interface';

export interface IUser extends IBase {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  refreshToken?: string;
  branchId?: string;
  deliveryWardId?: string;
  address?: string;
  role?: UserRoleEnum;
  otpCode?: string;
  mfaSentAt?: Date;
  loginAttempts?: number;
  lastLoginAttemptAt?: Date;
}
