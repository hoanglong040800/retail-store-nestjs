import { EAdminDivision } from '@/db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDivisionsService } from './admin-divisions.service';
import { AdminDivisionsRepo } from './admin-divisions.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EAdminDivision])],
  controllers: [],
  providers: [AdminDivisionsService, AdminDivisionsRepo],
  exports: [AdminDivisionsService, AdminDivisionsRepo],
})
export class AdminDivisionsModule {}
