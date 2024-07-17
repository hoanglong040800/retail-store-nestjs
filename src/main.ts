import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './config';
import { GlobalExceptionFilter } from './guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  createSwaggerDocument(app);
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(5000);
}
bootstrap();
