import { IsBoolean, IsDefined, ValidateIf } from 'class-validator';
import { IUser } from '../interface';
import { AdminDivisionDto } from './admin-division.dto';
import { UserRoleEnum } from '../enum/user.enum';

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

export class LoginAdminUserDto implements IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRoleEnum;
}

export class VerifyOtpAdminDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: LoginAdminUserDto;
}

const condition = 'required when when OTP verification is needed';

export class LoginAdminDto {
  @IsBoolean()
  needVerifyOtp: boolean;

  // need verify OTP - required when needVerifyOtp is true
  @ValidateIf((o) => o.needVerifyOtp === true)
  @IsDefined({ message: condition })
  userOtpToken: string | null;

  // skip OTP - required when needVerifyOtp is false
  @ValidateIf((o) => o.needVerifyOtp === false)
  @IsDefined({ message: condition })
  accessToken: TokenDto | null;

  @ValidateIf((o) => o.needVerifyOtp === false)
  @IsDefined({ message: condition })
  refreshToken: TokenDto | null;

  @ValidateIf((o) => o.needVerifyOtp === false)
  @IsDefined({ message: condition })
  user: LoginAdminUserDto | null;
}

export class TokenDto {
  token: string;
  expireAt: Date;
}

export type JwtTokenType = 'access' | 'refresh';

export class RefreshTokenDto {
  accessToken: TokenDto;
}
