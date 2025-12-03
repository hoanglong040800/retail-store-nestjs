import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';
import { GlobalExceptionFilter } from './guard';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';

async function bootstrap() {
  // must called before init app
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  createSwaggerDocument(app);
  // middleware
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  // response: validate & transform using @TransformDto decorator
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(app.get(Reflector)),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(5000);
}
bootstrap();
