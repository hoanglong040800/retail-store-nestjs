import { IUser } from '../interface';
import { AdminDivisionDto } from './admin-division.dto';

export class RegisterDto {
  result: boolean;
}

export class LoginUserDto implements IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  cartId: string;
  branchId?: string;
  deliveryWard?: AdminDivisionDto;
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
