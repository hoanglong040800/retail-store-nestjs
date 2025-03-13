import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { GetHomeDataDto } from '@/db/dto/home.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('home')
@ApiTags('Home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('')
  getHomeData(): Promise<GetHomeDataDto> {
    return this.homeService.getHomeData();
  }
}
