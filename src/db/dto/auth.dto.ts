import { UserDto } from './user.dto';

export class RegisterDto {
  result: boolean;
}

export type LoginUserDto = Pick<
  UserDto,
  'id' | 'email' | 'firstName' | 'lastName'
>;

export class LoginDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: LoginUserDto;
}

export class TokenDto {
  token: string;
  expireAt: Date;
}

export type JwtTokenType = 'access' | 'refresh';

export class RefreshTokenDto {
  accessToken: TokenDto;
}
