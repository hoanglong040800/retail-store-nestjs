import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTableBranchesAndAdminDivision1727099425388
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE admin_division_type_enum as ENUM ('province', 'district', 'ward')`,
    );

    await queryRunner.query(`
            CREATE TABLE admin_division_hierarchy (
                id uuid PRIMARY KEY,
                type admin_division_type_enum NOT NULL,
                name varchar NOT NULL,
                fullname varchar(150) NOT NULL,
                code int,
                area_code int,
                parent_id uuid,

                FOREIGN KEY (parent_id) REFERENCES admin_division_hierarchy(id)
            )
        `);

    await queryRunner.query(`
            CREATE TABLE branches (
                id uuid PRIMARY KEY,
                is_active boolean NOT NULL DEFAULT true,
                ward_id uuid NOT NULL,
                
                FOREIGN KEY (ward_id) REFERENCES admin_division_hierarchy(id)
            )
        `);

    await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN branch_id uuid,
            ADD COLUMN delivery_ward_id uuid,
            ADD COLUMN address varchar(150),
            ADD FOREIGN KEY (delivery_ward_id) REFERENCES admin_division_hierarchy(id),
            ADD FOREIGN KEY (branch_id) REFERENCES branches(id)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users DROP COLUMN branch_id, DROP COLUMN delivery_ward_id, DROP COLUMN address`,
    );
    await queryRunner.query(`DROP TABLE branches`);
    await queryRunner.query(`DROP TABLE admin_division_hierarchy`);
    await queryRunner.query(`DROP TYPE admin_division_type_enum`);
  }
}
