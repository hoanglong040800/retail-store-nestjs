import { EUser } from '@/db/entities';

export type SignedTokenUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type SignedTokenData = {
  user: SignedTokenUser;
};

export type ValidateLoginParams = {
  user: EUser;
  inputPassword: string;
};
