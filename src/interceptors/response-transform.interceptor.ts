import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ClassConstructor } from 'class-transformer';
import { validateAndTransformResponse } from '@/utils/common.util';

const RESPONSE_DTO_KEY = 'response_dto';

// Decorator - add to controller methods
export const ResponseDto = <T>(dto: ClassConstructor<T>) =>
  SetMetadata(RESPONSE_DTO_KEY, dto);

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dto = this.reflector.get(RESPONSE_DTO_KEY, context.getHandler());

    return next.handle().pipe(
      mergeMap(async (data) => {
        if (!dto || data == null) return data;

        if (Array.isArray(data)) {
          return Promise.all(
            data.map((item) => validateAndTransformResponse(dto, item)),
          );
        }

        return validateAndTransformResponse(dto, data);
      }),
    );
  }
}
