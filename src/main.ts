import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';
import { GlobalExceptionFilter } from './guard';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  // must called before init app
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  createSwaggerDocument(app);
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
