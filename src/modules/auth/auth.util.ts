import moment from 'moment';
import { JwtTokenUnit } from '@/constants';
import { CustomException } from '@/guard';
import { HttpStatus } from '@nestjs/common';

export function calculateExpireTime(
  expiresIn: string | number,
  unit: moment.unitOfTime.DurationConstructor = JwtTokenUnit,
): Date {
  const parsedExpiresIn = Number(expiresIn);

  if (isNaN(parsedExpiresIn)) {
    throw new CustomException(
      'INTERNAL_SERVER_ERROR',
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Invalid expiresIn value',
    );
  }

  const now = moment();
  const expireTime = now.add(parsedExpiresIn, unit);

  return expireTime.toDate();
}
