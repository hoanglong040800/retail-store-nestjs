import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresOrmOptions } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(postgresOrmOptions)],
})
export class DbModule {}
