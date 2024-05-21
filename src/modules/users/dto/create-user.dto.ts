import { EUser } from '@/db/entities';

export class CreateUserDto implements EUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
