import { EBranch } from '@/db/entities';
import { BaseRepo } from '../_base';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

export class BranchesRepo extends BaseRepo<EBranch> {
  constructor(
    @InjectRepository(EBranch)
    private readonly repo: Repository<EBranch>,
  ) {
    super();
  }

  find(options?: FindManyOptions<EBranch> | undefined): Promise<EBranch[]> {
    return this.repo.find(options);
  }
}
