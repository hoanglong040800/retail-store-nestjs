import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductsModule } from '../products';
import { CategoryModule } from '../categories';

@Module({
  imports: [ProductsModule, CategoryModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
