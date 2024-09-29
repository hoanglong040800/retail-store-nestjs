import { Injectable } from '@nestjs/common';
import { CategoriesService } from '@/modules/categories';
import { GetGlobalConfigDto } from '@/db/dto';
import { BranchesAdminDivisionsService } from '@/modules/branches-admin-divisions';

@Injectable()
export class ConfigService {
  constructor(
    private readonly cateSrv: CategoriesService,
    private readonly branchAdminDivSrv: BranchesAdminDivisionsService,
  ) {}

  async getGlobalConfig(): Promise<GetGlobalConfigDto> {
    const [categories, provinces] = await Promise.all([
      this.cateSrv.findAllByOptions(),
      this.branchAdminDivSrv.getAdminDivisionsByActiveBranches(),
    ]);

    return {
      categories,
      deliveryProvinces: provinces,
    };
  }
}
