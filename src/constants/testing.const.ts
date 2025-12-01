import { UserRoleEnum } from '@/db/enum/user.enum';
import { RequestType } from '@/modules/_base';
import { SignedTokenUser } from '@/modules/auth';

export const mockSignedTokenUser: SignedTokenUser = {
  id: '1',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  role: UserRoleEnum.Shopper,
};

export const mockRequest = {
  user: mockSignedTokenUser,
} as RequestType;
