import { EUser } from '@/entities';

export class UpdateUserDto extends EUser {
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
}
