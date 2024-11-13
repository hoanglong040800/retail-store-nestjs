import { HttpStatus, Injectable } from '@nestjs/common';
import { BranchesRepo } from './branches.repo';
import { FindBranchesByFilterQuery } from '@/db/input';
import { EBranch } from '@/db/entities';
import { CustomException } from '@/guard';

@Injectable()
export class BranchesService {
  constructor(private readonly branchRepo: BranchesRepo) {}

  async findByFilter({
    provinceId,
    districtId,
    wardId,
    isActive,
    ...rest
  }: FindBranchesByFilterQuery) {
    return await this.branchRepo.find({
      select: ['id', 'name', 'ward'],

      relations: {
        ward: {
          parentDivision: {
            parentDivision: true,
          },
        },
      },

      where: {
        // assign undefined because admin division never null
        provinceId: provinceId || undefined,
        districtId: districtId || undefined,
        wardId: wardId || undefined,
        isActive: isActive || true,
        ...(rest || {}),
      },
    });
  }

  async getBranchByWardId(wardId: string): Promise<EBranch> {
    // auto select 1 branch if both in same ward
    const branch = await this.branchRepo.findOne({
      where: {
        wardId: wardId,
      },
    });

    if (!branch) {
      throw new CustomException('BRANCH_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return branch;
  }
}
