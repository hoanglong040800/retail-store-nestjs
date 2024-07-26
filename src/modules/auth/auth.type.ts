import { IUser } from '@/db/interface';

export type SignedTokenUser = Pick<
  IUser,
  'id' | 'email' | 'firstName' | 'lastName'
>;

export type SignedTokenData = {
  user: SignedTokenUser;
};
