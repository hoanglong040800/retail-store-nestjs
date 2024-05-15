import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

const configOptions: ConfigModuleOptions = {
  envFilePath: ['.env'],
  cache: true,
  isGlobal: true,
};

export const AppConfigModule = ConfigModule.forRoot(configOptions);
