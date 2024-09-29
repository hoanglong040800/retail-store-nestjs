import { Module } from '@nestjs/common';
import { BranchesModule } from '@/modules/branches';
import { AdminDivisionsModule } from '@/modules/admin-divisions';
import { BranchesAdminDivisionsService } from './branches-admin-division.service';

@Module({
  imports: [BranchesModule, AdminDivisionsModule],
  providers: [BranchesAdminDivisionsService],
  exports: [BranchesAdminDivisionsService],
})
export class BranchesAdminDivisionModule {}
