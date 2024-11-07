import { DataSource, DataSourceOptions } from 'typeorm';
import { ENV } from '../constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  StorageDriver,
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';

export const postgresOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  ...ENV.db,

  // related
  entities: [__dirname + '/../db/entities/*.entity{.ts,.js}'], //ext .js because get from ./dist
  migrations: [__dirname + `/../db/migrations/${ENV.migrateFolder}/*.ts`],
  migrationsTableName: 'migrations',

  // settings
  synchronize: false,
  logging: true,
  migrationsTransactionMode: 'each',
  extra: {
    trustServerCertificate: true,
  },
};

const AppDataSource = new DataSource(postgresOrmOptions as DataSourceOptions);
initializeTransactionalContext({
  storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
});
addTransactionalDataSource(AppDataSource);
AppDataSource.initialize();

export default AppDataSource;
