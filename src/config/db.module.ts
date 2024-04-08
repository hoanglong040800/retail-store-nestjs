import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '../constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...ENV.db,

      // related
      entities: [__dirname + '/../entities/*.entity{.ts,.js}'], //ext .js because get from ./dist
      migrations: [__dirname + '/../entities/*.entity{.ts,.js}'],

      // settings
      synchronize: true,
      logging: false,
      extra: {
        trustServerCertificate: true,
      },
    }),
  ],
})
export class DbModule {}
