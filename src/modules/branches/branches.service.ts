import { Injectable } from '@nestjs/common';
import { BranchesRepo } from './branches.repo';
import { FindBranchesByFilterQuery } from '@/db/input';

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
}
