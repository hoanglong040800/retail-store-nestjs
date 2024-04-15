import { EUser } from '@/entities';

export class RegisterBody implements EUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export class LoginBody implements EUser{
  email: string;
  password: string;
}