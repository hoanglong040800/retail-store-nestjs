import * as moment from 'moment';
import { JwtTokenUnit } from '@/constants';

export function calculateExpireTime(
  expiresIn: string,
  unit: moment.unitOfTime.DurationConstructor = JwtTokenUnit,
): Date {
  if (isNaN(+expiresIn)) {
    throw new Error('Invalid expiresIn format');
  }

  const now = moment();
  const expireTime = now.add(expiresIn, unit);

  return expireTime.toDate();
}
