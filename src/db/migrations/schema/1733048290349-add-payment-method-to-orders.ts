import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentMethodToOrders1733048290349
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE payment_method_enum as ENUM ('cash', 'credit_card')    
    `);

    await queryRunner.query(`
        ALTER TABLE orders
        ADD COLUMN payment_method payment_method_enum NOT NULL DEFAULT 'cash'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE orders
        DROP COLUMN payment_method
    `);

    await queryRunner.query(`DROP TYPE payment_method_enum`);
  }
}
