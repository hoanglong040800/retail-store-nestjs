import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './custom.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      errorCode: exception.errorCode,
      statusCode,
      message: exception.message || 'Internal Server Error',
    });
  }
}
