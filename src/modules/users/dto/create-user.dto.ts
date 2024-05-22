import { IUser } from '@/db/interface';

export class CreateUserDto implements IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
