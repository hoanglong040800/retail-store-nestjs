import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';
import { GlobalExceptionFilter } from './guard';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

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

  // response: pair with @Exclude to hide sensitive data from response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(5000);
}
bootstrap();
