import { IUser } from '@/db/interface';

export const DEFAULT_USER_ID = '9b9e4403-4398-4030-b90b-0a82be5e1e65';

// DO NOT CHANGE THE IDS
export const SYSTEM_USERS: Record<string, IUser> = {
  MIGRATE_DATA: {
    id: '00000000-0000-0000-0000-000000000001',
  },

  API: {
    id: '00000000-0000-0000-0000-000000000002',
  },

  WEBHOOK: {
    id: '00000000-0000-0000-0000-000000000003',
  },

  CRONJOB: {
    id: '00000000-0000-0000-0000-000000000004',
  },
};
