import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDeliveryWardIdBranchId1739066231199
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN branch_id uuid,
            ADD COLUMN delivery_ward_id uuid,
            ADD FOREIGN KEY (branch_id) REFERENCES branches(id),
            ADD FOREIGN KEY (delivery_ward_id) REFERENCES admin_division_hierarchy(id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN branch_id,
            DROP COLUMN delivery_ward_id;
        `);
  }
}
