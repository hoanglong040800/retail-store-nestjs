import { EUser } from '@/db/entities';

export class UpdateUserDto extends EUser {
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
}
