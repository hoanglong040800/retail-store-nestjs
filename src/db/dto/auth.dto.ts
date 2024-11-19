import { IUser } from '../interface';

export class RegisterDto {
  result: boolean;
}

export class LoginUserDto implements IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  cartId: string;
}

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
