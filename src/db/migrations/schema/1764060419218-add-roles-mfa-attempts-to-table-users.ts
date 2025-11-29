import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesMfaAttemptsToTableUsers1764060419218
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`
        CREATE TYPE user_role_enum as ENUM ('admin', 'shopper');
      `);

      await queryRunner.query(`
        ALTER TABLE users
        ADD COLUMN role user_role_enum NOT NULL DEFAULT 'shopper',
        ADD COLUMN otp_code varchar(20),
        ADD COLUMN otp_sent_at timestamp,
        ADD COLUMN login_attempts smallint;
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN role,
            DROP COLUMN otp_code,
            DROP COLUMN login_attempts,
            DROP COLUMN otp_sent_at;
        `);

    await queryRunner.query(`
            DROP TYPE user_role_enum;
        `);
  }
}
