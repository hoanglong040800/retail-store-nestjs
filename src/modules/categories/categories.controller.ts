import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { ECategory } from '@/db/entities';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly cateSrv: CategoriesService) {}

  @Get()
  async findAll(): Promise<ECategory[]> {
    return await this.cateSrv.findAllByOptions();
  }
}
