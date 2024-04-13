import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Retail Store')
  .setDescription('Retail Store swagger document')
  .setVersion('1.0')
  .build();

export const createSwaggerDocument = (app: INestApplication<any>) => {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
};
