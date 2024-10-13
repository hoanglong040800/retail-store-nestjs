import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// TODO implement custom validation
@ValidatorConstraint({ name: 'IsNotNegative' })
export class IsNotNegative implements ValidatorConstraintInterface {
  validate(number: number): boolean {
    return !isNaN(number) && number >= 0;
  }

  defaultMessage(valArg?: ValidationArguments): string {
    return `${valArg?.targetName} must be greater than or equal to 0`;
  }
}
