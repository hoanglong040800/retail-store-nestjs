import { Injectable } from '@nestjs/common';
import { CategoriesService } from '@/modules/categories';
import { GetGlobalConfigDto } from '@/db/dto';

@Injectable()
export class ConfigService {
  constructor(private readonly cateSrv: CategoriesService) {}

  async getGlobalConfig(): Promise<GetGlobalConfigDto> {
    const [categories] = await Promise.all([this.cateSrv.findAllByOptions()]);

    return {
      categories,
    };
  }
}
