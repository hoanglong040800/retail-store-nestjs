import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from '@/db/dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly cateSrv: CategoriesService) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return await this.cateSrv.findAllByOptions();
  }
}
