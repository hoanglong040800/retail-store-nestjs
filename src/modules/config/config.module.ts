import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { CategoryModule } from '@/modules/categories';
import { BranchesAdminDivisionModule } from '@/modules/branches-admin-divisions';

@Module({
  imports: [CategoryModule, BranchesAdminDivisionModule],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
