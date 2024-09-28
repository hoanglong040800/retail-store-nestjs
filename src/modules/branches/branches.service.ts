import { Injectable } from '@nestjs/common';
import { BranchesRepo } from './branches.repo';
import { FindBranchesByFilterQuery } from '@/db/input';
import { BranchesRlt } from '@/constants';

@Injectable()
export class BranchesService {
  constructor(private readonly branchRepo: BranchesRepo) {}

  async findByFilter({
    provinceId,
    districtId,
    wardId,
    ...rest
  }: FindBranchesByFilterQuery) {
    return await this.branchRepo.find({
      relations: [
        BranchesRlt.ward,
        BranchesRlt.wardDistrict,
        BranchesRlt.wardDistrictProvince,
        BranchesRlt.district,
        BranchesRlt.districtProvince,
      ],
      where: {
        provinceId: provinceId || undefined,
        districtId: districtId || undefined,
        wardId: wardId || undefined,
        ...rest,
      },
    });
  }
}
