import { Injectable } from '@nestjs/common';
import { BranchesRepo } from './branches.repo';

@Injectable()
export class BranchesService {
  constructor(private readonly branchRepo: BranchesRepo) {}
}
