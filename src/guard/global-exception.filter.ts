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
  private getStatusMessage(statusCode: number): string {
    const statusMessages: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'Bad Request',
      [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
      [HttpStatus.FORBIDDEN]: 'Forbidden',
      [HttpStatus.NOT_FOUND]: 'Not Found',
      [HttpStatus.TOO_MANY_REQUESTS]: 'Too Many Requests',

      [HttpStatus.BAD_GATEWAY]: 'Bad Gateway',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    };

    return statusMessages[statusCode] || 'Internal Server Error';
  }

  getMessage(exception: CustomException): string {
    const statusCode =
      exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    return exception.message || this.getStatusMessage(statusCode);
  }

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getMessage(exception);

    if (
      statusCode.toString().startsWith('4') ||
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      console.trace(exception);
    }

    response.status(statusCode).json({
      errorCode: exception.errorCode,
      statusCode,
      message,
    });
  }
}
