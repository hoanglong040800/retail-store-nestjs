import { TokenDto } from '../dto';
import { IUser } from '../interface';

export class RegisterBody implements IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export class LoginBody implements IUser {
  email: string;
  password: string;
}

export class RefreshTokenBody {
  accessToken: TokenDto;
}
