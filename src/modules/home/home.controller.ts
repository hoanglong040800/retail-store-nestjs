import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { GetHomeDataDto } from '@/db/dto/home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('')
  getHomeData(): Promise<GetHomeDataDto> {
    return this.homeService.getHomeData();
  }
}
