import { EUser } from '@/db/entities';
import { UserRoleEnum } from '@/db/enum/user.enum';

export type SignedTokenUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRoleEnum;
};

export type OtpJwtUserPayload = {
  id: string;
  email: string;
  role: UserRoleEnum;
};

export type SignedTokenData = {
  user: SignedTokenUser;
};

export type SignedOtpTokenData = {
  user: OtpJwtUserPayload;
};

export type ValidateLoginParams = {
  user: EUser;
  inputPassword: string;
};
