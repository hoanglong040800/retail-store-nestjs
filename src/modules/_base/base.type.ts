import { SignedTokenUser } from '@/modules/auth/auth.type';

export type RequestType = Request & {
  user: SignedTokenUser;
};
