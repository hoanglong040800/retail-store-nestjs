import { IUser } from '@/db/interface';

export class UpdateUserDto implements IUser {
  createdBy?: string;
  updatedBy?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
}
