import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './data-source';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleOptions)],
})
export class DbModule {}
