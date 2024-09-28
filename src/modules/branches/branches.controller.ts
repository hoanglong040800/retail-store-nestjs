import { Controller } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('branches')
@ApiTags('Branches')
export class BranchesController {
  constructor(private readonly branchSrv: BranchesService) {}
}
