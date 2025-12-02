import { SignedTokenUser } from '@/modules/auth/auth.type';
import { DeepPartial } from 'typeorm';

export type RequestType = Request & {
  user: SignedTokenUser;
};

export type RepoCreatePayload<T> = DeepPartial<
  Omit<T, 'createdBy' | 'updatedBy' | 'id'>
>;

export type RepoUpdatePayload<T> = DeepPartial<
  Omit<T, 'createdBy' | 'updatedBy'>
>;
