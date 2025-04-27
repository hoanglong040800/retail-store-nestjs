import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetSearchDto } from '@/db/dto';
import { GetSearchQuery } from '@/db/input';
import { getSearchQueryOptions } from './shared';

@Controller('search')
@ApiTags('Search')
export class SearchController {
  constructor(private readonly searchSrv: SearchService) {}

  @Get('')
  @ApiQuery(getSearchQueryOptions)
  async search(@Query() query: GetSearchQuery): Promise<GetSearchDto> {
    return await this.searchSrv.getSearchResult(query);
  }
}
