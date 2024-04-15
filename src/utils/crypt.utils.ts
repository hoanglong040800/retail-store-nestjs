import { hashSync } from 'bcrypt';
import { SALT_ROUNDS } from '@/constants';

export const encryptString = (str: string): string => {
  return hashSync(str, SALT_ROUNDS);
};
