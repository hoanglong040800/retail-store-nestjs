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
  getMessage(exception: CustomException): string {
    const statusCode =
      exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    if (statusCode === HttpStatus.BAD_REQUEST) {
      const responseMsg = exception.getResponse() as {
        message: string;
        statusCode: number;
      };

      return responseMsg?.message || 'Bad Request';
    }

    return exception.message || 'Internal Server Error';
  }

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getMessage(exception);

    response.status(statusCode).json({
      errorCode: exception.errorCode,
      statusCode,
      message,
    });
  }
}
