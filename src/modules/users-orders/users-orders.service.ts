import { HttpStatus, Injectable } from '@nestjs/common';
import { SignedTokenUser } from '../auth';
import { CustomException } from '@/guard';

@Injectable()
export class UsersOrdersService {
  getOrdersByUser(userId: string, auditUser: SignedTokenUser) {
    // TODO move to util
    if (userId !== auditUser.id) {
      throw new CustomException(
        'PARAMS_NOT_MATCH_WITH_TOKEN',
        HttpStatus.UNAUTHORIZED,
        `userId: ${userId} !== auditUser.id: ${auditUser.id}`,
      );
    }

    return 'long';
  }
}
