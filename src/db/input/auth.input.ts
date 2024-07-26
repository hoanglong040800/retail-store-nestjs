import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
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

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

export class LoginBody implements IUser {
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
