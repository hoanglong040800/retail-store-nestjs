import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },

  // DEFAULT MUST BE SCHEMA or else BREAK YARN COMMAND
  migrateFolder: process.env.MIGRATE_FOLDER || 'schema',

  db: {
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT || 1433),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },

  // default expire unit is minute
  jwt: {
    access: {
      secret: process.env.ACCESS_SECRET || '',
      expire: process.env.ACCESS_EXPIRATION_TIME || '60',
    },

    refresh: {
      secret: process.env.REFRESH_SECRET || '',
      expire: process.env.REFRESH_EXPIRATION_TIME || (7 * 24 * 60).toString(),
    },

    otp: {
      secret: process.env.USER_OTP_SECRET || '',
      expire: (10 * 60).toString(), // 10 minutes
    },
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },

  settings: {
    otpLoginBackOffice: process.env.OTP_LOGIN_BACK_OFFICE || false,
  },
};
