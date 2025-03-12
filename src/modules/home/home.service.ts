import { GetHomeDataDto } from '@/db/dto/home.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  constructor() {}

  async getHomeData(): Promise<GetHomeDataDto> {
    return {
      productCarousels: [],
    };
  }
}
