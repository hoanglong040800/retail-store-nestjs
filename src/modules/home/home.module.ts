import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { CategoryModule } from '../categories';

@Module({
  imports: [CategoryModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
