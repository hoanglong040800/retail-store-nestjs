import { DataSource, DataSourceOptions } from 'typeorm';
import { ENV } from '../constants';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

const postgresOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  ...ENV.db,

  // related
  entities: [__dirname + '/../db/entities/*.entity{.ts,.js}'], //ext .js because get from ./dist
  migrations: [__dirname + `/../db/migrations/${ENV.migrateFolder}/*.ts`],
  migrationsTableName: 'migrations',

  // settings
  synchronize: false,
  logging: false,
  migrationsTransactionMode: 'each',
  extra: {
    trustServerCertificate: true,
  },
};

const AppDataSource = new DataSource(postgresOrmOptions as DataSourceOptions);
AppDataSource.initialize();
// MUST export so typeorm can run migration
export default AppDataSource;

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => postgresOrmOptions,

  dataSourceFactory: (options) => {
    if (!options) {
      throw new Error('Invalid options passed');
    }

    const AppDataSource = new DataSource(options);

    return Promise.resolve(addTransactionalDataSource(AppDataSource));
  },
};
