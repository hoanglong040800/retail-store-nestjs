import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// TODO implement custom validation
@ValidatorConstraint({ name: 'IsNotNegative' })
export class IsNotNegative implements ValidatorConstraintInterface {
  validate(numbers: number[]): boolean {
    return numbers.every((n) => !isNaN(n) && n >= 0);
  }
}

export const customValMsg = {
  isNotNegative: 'Must be greater than or equal to 0',
};
