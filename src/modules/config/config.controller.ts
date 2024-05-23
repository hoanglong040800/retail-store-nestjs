import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ApiTags } from '@nestjs/swagger';
import { GetGlobalConfigDto } from './dto';

@Controller('config')
@ApiTags('Config')
export class ConfigController {
  constructor(private readonly configSrv: ConfigService) {}

  @Get()
  async getGlobalConfig(): Promise<GetGlobalConfigDto> {
    return await this.configSrv.getGlobalConfig();
  }
}
