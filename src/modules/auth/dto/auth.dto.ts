import { EUser } from '@/entities';

export class LoginDto {
  accessToken: string;
  refreshToken: string;
  user: Pick<EUser, 'id' | 'email' | 'firstName' | 'lastName'>;
}
