import { CustomException } from '@/modules/_base';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      errorCode: exception.errorCode,
      statusCode: exception.getStatus(),
      message: exception.message || 'Internal Server Error',
    });
  }
}
