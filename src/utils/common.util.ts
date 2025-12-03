import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomException } from '@/guard/custom.exception';
import { HttpStatus } from '@nestjs/common';

export const keyBy = (array: any[], key: string): Record<string, any> =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

export const castArray = (data: any = []) =>
  Array.isArray(data) ? data : [data];

export const checkEmptyObject = (obj: object): boolean => {
  if (!obj || Object.getOwnPropertyNames(obj).length === 0) {
    return true;
  }

  return false;
};

export const validateAndTransformResponse = async <T extends object>(
  dto: ClassConstructor<T>,
  response: T,
): Promise<T> => {
  // apply class to object + remove fields mark @Exclude()
  const resultDto = plainToInstance(dto, response, {
    strategy: 'exposeAll', // include all fields in the response even don't have @Expose()
    excludeExtraneousValues: false, // do NOT strictly remove field that don't have @Expose()
  });

  const errors = await validate(resultDto as object);

  if (errors.length === 0) {
    return resultDto;
  }

  const errorMessages = errors
    .map((err) => {
      const constraints = Object.values(err.constraints || {});
      return constraints.join(', ');
    })
    .join('; ');

  throw new CustomException(
    'INVALID_RESPONSE',
    HttpStatus.INTERNAL_SERVER_ERROR,
    errorMessages,
  );
};

export const generateOtpCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
