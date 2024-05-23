import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly cateSrv: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.cateSrv.findAllByOptions();
  }
}
