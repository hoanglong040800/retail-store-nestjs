import { UserDto } from './user.dto';

export class RegisterDto {
  result: boolean;
}

export class LoginDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: Pick<UserDto, 'id' | 'email' | 'firstName' | 'lastName'>;
}

export class TokenDto {
  token: string;
  expireAt: Date;
}

export type JwtTokenType = 'access' | 'refresh';
