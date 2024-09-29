import { Injectable } from '@nestjs/common';
import { AdminDivisionsRepo } from '@/modules/admin-divisions';
import { BranchesRepo } from '@/modules/branches';
import { AdminDivisionDto } from '@/db/dto';
import { EAdminDivision, EBranch } from '@/db/entities';
import { In } from 'typeorm';

@Injectable()
export class BranchesAdminDivisionsService {
  constructor(
    private readonly adminDivRepo: AdminDivisionsRepo,
    private readonly branchesRepo: BranchesRepo,
  ) {}

  async getAdminDivisionsByActiveBranches(): Promise<AdminDivisionDto[]> {
    const activeBranchWards: EBranch[] = await this.branchesRepo.find({
      select: ['wardId', 'districtId', 'provinceId'],
      where: {
        isActive: true,
      },
    });

    if (!activeBranchWards || !activeBranchWards.length) {
      return [];
    }

    const wardIds = activeBranchWards.map((item) => item.wardId);
    const districtIds = activeBranchWards.map((item) => item.districtId);
    const provinceIds = activeBranchWards.map((item) => item.provinceId);

    const activeAdminDivisions: EAdminDivision[] = await this.adminDivRepo.find(
      {
        select: {
          id: true,
          fullname: true,
          childDivisions: {
            id: true,
            fullname: true,
            childDivisions: {
              id: true,
              fullname: true,
            },
          },
        },

        relations: {
          childDivisions: {
            childDivisions: true,
          },
        },

        where: {
          id: In(provinceIds),
          childDivisions: {
            id: In(districtIds),
            childDivisions: {
              id: In(wardIds),
            },
          },
        },
      },
    );

    return activeAdminDivisions;
  }
}
