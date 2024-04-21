import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },

  db: {
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT || 1433),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },

  jwt: {
    access: {
      secret: process.env.ACCESS_SECRET || '',
      expire: process.env.ACCESS_EXPIRATION_TIME || '10m',
    },

    refresh: {
      secret: process.env.REFRESH_SECRET || '',
      expire: process.env.REFRESH_EXPIRATION_TIME || '30d',
    },
  },
};
