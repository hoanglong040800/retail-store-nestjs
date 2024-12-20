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

export class RefreshTokenBody {
  @IsNotEmptyObject()
  @IsObject()
  accessToken: TokenDto;
}
