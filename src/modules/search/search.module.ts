import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductsModule } from '../products';

@Module({
  imports: [ProductsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
