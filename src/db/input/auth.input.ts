import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';
import { TokenDto } from '../dto';
import { IUser } from '../interface';

export class RegisterBody implements IUser {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class LoginBody implements IUser {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginAdminBody implements IUser {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenBody {
  @IsNotEmptyObject()
  @IsObject()
  accessToken: TokenDto;
}

export class VerifyOtpBackOfficeBody {
  @IsNotEmpty()
  @IsString()
  userOtpToken: string;

  @IsNotEmpty()
  @IsString()
  otpCode: string;
}

export class ResendOtpBackOfficeBody {
  @IsNotEmpty()
  @IsString()
  jwtOtpToken: string;
}

export class ForgotPasswordBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordBody {
  @IsNotEmpty()
  @IsString()
  jwtToken: string;

  @IsNotEmpty()
  @IsString()
  otpCode: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
