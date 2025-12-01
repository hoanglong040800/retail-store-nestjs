import { EUser } from '@/db/entities';

export type SignedTokenUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type OtpJwtPayload = {
  userId: string;
};

export type SignedTokenData = {
  user: SignedTokenUser;
};

export type SignedOtpTokenData = {
  user: OtpJwtPayload;
};

export type ValidateLoginParams = {
  user: EUser;
  inputPassword: string;
};
