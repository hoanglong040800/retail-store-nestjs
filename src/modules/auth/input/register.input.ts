import { EUser } from '@/entities';

export class RegisterBody implements EUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
