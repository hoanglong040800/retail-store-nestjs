import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './users.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EUser } from '@/db/entities';
import { CartsModule } from '../carts';

@Module({
  imports: [TypeOrmModule.forFeature([EUser]), CartsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo],
  exports: [UsersService, UsersRepo],
})
export class UsersModule {}
