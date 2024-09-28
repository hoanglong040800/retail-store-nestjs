import { Controller, Get, Query } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { ApiTags } from '@nestjs/swagger';
import { BranchDto } from '@/db/dto';
import { FindBranchesByFilterQuery } from '@/db/input';

@Controller('branches')
@ApiTags('Branches')
export class BranchesController {
  constructor(private readonly branchSrv: BranchesService) {}

  @Get()
  async findByFilter(
    @Query() query: FindBranchesByFilterQuery,
  ): Promise<BranchDto[]> {
    return await this.branchSrv.findByFilter(query);
  }
}
