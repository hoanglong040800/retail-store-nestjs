import { EUser } from '@/db/entities';

export class LoginDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: Pick<EUser, 'id' | 'email' | 'firstName' | 'lastName'>;
}

export class TokenDto {
  token: string;
  expireAt: Date;
}

export type JwtTokenType = 'access' | 'refresh';
