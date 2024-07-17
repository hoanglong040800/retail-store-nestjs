import { ExceptionCode } from '@/db/enum/exception.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  errorCode: ExceptionCode;

  constructor(
    errorCode: ExceptionCode = 'INTERNAL_SERVER_ERROR',
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = '',
  ) {
    super(message, statusCode);

    this.errorCode = errorCode;
  }
}
