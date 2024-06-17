import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { CategoryModule } from '@/modules/categories';

@Module({
  imports: [CategoryModule],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
