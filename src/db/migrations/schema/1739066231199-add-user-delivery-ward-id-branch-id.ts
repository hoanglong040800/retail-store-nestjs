import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDeliveryWardIdBranchId1739066231199
  implements MigrationInterface
{
  // Columns and FKs already exist when 1727099425388 ran first, so every step is guarded.
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS branch_id uuid,
            ADD COLUMN IF NOT EXISTS delivery_ward_id uuid,
            ADD COLUMN IF NOT EXISTS address varchar(200);
        `);

    await queryRunner.query(`
            DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM information_schema.table_constraints
                WHERE table_name = 'users' AND constraint_name = 'users_branch_id_fkey'
              ) THEN
                ALTER TABLE users ADD FOREIGN KEY (branch_id) REFERENCES branches(id);
              END IF;

              IF NOT EXISTS (
                SELECT 1 FROM information_schema.table_constraints
                WHERE table_name = 'users' AND constraint_name = 'users_delivery_ward_id_fkey'
              ) THEN
                ALTER TABLE users ADD FOREIGN KEY (delivery_ward_id) REFERENCES admin_division_hierarchy(id);
              END IF;
            END $$;
        `);
  }

  // Intentionally empty: 1727099425388 owns these columns and drops them in its own down().
  public async down(): Promise<void> {
    return;
  }
}
