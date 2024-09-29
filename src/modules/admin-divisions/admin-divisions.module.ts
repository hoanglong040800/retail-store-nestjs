import { EAdminDivision } from '@/db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDivisionsRepo } from './admin-divisions.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EAdminDivision])],
  controllers: [],
  providers: [AdminDivisionsRepo],
  exports: [AdminDivisionsRepo],
})
export class AdminDivisionsModule {}
