import { EBranch } from '@/db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { BranchesRepo } from './branches.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EBranch])],
  controllers: [BranchesController],
  providers: [BranchesService, BranchesRepo],
  exports: [BranchesService, BranchesRepo],
})
export class BranchesModule {}
