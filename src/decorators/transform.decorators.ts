import { castArray } from '@/utils';
import { Transform } from 'class-transformer';

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toLowerCase();
      }

      return value.map((v) => v.toLowerCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toUpperCase();
      }

      return value.map((v) => v.toUpperCase());
    },
    {
      toClassOnly: true,
    },
  );
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): PropertyDecorator {
  return Transform(
    (params): unknown[] => {
      const value = params.value;

      if (!value) {
        return value;
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}
