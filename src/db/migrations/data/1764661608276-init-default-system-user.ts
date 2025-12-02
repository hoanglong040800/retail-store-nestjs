import { SYSTEM_USERS } from '@/constants';
import { EUser } from '@/db/entities';
import { UserRoleEnum } from '@/db/enum/user.enum';
import { MigrationInterface, QueryRunner, Repository } from 'typeorm';

export const SYSTEM_USERS_DATA: Record<string, EUser> = {
  MIGRATE_DATA: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'migration.data@internal',
    firstName: 'Migration',
    lastName: 'Data',
    password: 'migration.data',
    role: UserRoleEnum.Admin,
  },

  API: {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'api@internal',
    firstName: 'API',
    lastName: '',
    password: 'api',
    role: UserRoleEnum.Admin,
    createdBy: SYSTEM_USERS.MIGRATE_DATA.id,
  },

  WEBHOOK: {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'webhook@internal',
    firstName: 'Webhook',
    lastName: '',
    password: 'webhook',
    role: UserRoleEnum.Admin,
    createdBy: SYSTEM_USERS.MIGRATE_DATA.id,
  },

  CRONJOB: {
    id: '00000000-0000-0000-0000-000000000004',
    email: 'cronjob@internal',
    firstName: 'Cronjob',
    lastName: '',
    password: 'cronjob',
    role: UserRoleEnum.Admin,
    createdBy: SYSTEM_USERS.MIGRATE_DATA.id,
  },
};

export class InitDefaultSystemUser1764661608276 implements MigrationInterface {
  userRepo: Repository<EUser>;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    this.userRepo = queryRunner.connection.getRepository(EUser);

    try {
      for (const user of Object.values(SYSTEM_USERS_DATA)) {
        await this.userRepo.save(user);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await this.userRepo.delete(
        Object.values(SYSTEM_USERS_DATA).map((user) => user.id),
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
}
