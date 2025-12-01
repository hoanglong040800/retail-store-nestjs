import { IsBoolean, IsDefined, ValidateIf } from 'class-validator';
import { IUser } from '../interface';
import { AdminDivisionDto } from './admin-division.dto';
import { UserRoleEnum } from '../enum/user.enum';

export class TokenDto {
  token: string;
  expireAt: Date;
}

export type JwtTokenType = 'access' | 'refresh' | 'userOtp';

export class RefreshTokenDto {
  accessToken: TokenDto;
}

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

export class VerifyOtpBackOfficeDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: LoginAdminUserDto;
}

const needWhenTurnOnOtp = 'required when turn on OTP Back Office';
const needWhenNormalLogin = 'required when do normal login';

export class LoginAdminDto {
  @IsBoolean()
  needVerifyOtp: boolean;

  // need verify OTP - required when needVerifyOtp is true
  @ValidateIf((o) => o.needVerifyOtp === true)
  @IsDefined({ message: needWhenTurnOnOtp })
  userOtpToken?: TokenDto;

  // normal login - required when needVerifyOtp is false
  @ValidateIf((o) => o.needVerifyOtp === false)
  @IsDefined({ message: needWhenNormalLogin })
  accessToken?: TokenDto;

  @ValidateIf((o) => o.needVerifyOtp === false)
  @IsDefined({ message: needWhenNormalLogin })
  refreshToken?: TokenDto;

  @ValidateIf((o) => o.needVerifyOtp === false)
  @IsDefined({ message: needWhenNormalLogin })
  user?: LoginAdminUserDto;
}
