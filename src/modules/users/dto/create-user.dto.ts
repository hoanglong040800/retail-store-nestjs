import { EUser } from '@/entities';

export class CreateUserDto implements EUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
