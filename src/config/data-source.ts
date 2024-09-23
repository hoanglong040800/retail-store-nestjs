import { DataSource, DataSourceOptions } from 'typeorm';
import { ENV } from '../constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  ...ENV.db,

  // related
  entities: [__dirname + '/../db/entities/*.entity{.ts,.js}'], //ext .js because get from ./dist
  migrations: [__dirname + `/../db/migrations/${ENV.migrateFolder}/*.ts`],
  migrationsTableName: 'migrations',

  // settings
  synchronize: true,
  logging: false,
  extra: {
    trustServerCertificate: true,
  },
};

const AppDataSource = new DataSource(postgresOrmOptions as DataSourceOptions);

export default AppDataSource;
