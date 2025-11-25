import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCoreSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

      await queryRunner.query(`
          CREATE TABLE categories (
              created_at timestamp with time zone NOT NULL DEFAULT now(),
              created_by uuid,
              updated_at timestamp with time zone NOT NULL DEFAULT now(),
              updated_by uuid,
              id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
              name varchar(50),
              level int NOT NULL,
              icon varchar(300),
              is_leaf boolean NOT NULL,
              display_order int,
              parent_id uuid,

              CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id)
          );
      `);

      await queryRunner.query(`
          CREATE TABLE users (
              created_at timestamp with time zone NOT NULL DEFAULT now(),
              created_by uuid,
              updated_at timestamp with time zone NOT NULL DEFAULT now(),
              updated_by uuid,
              id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
              email varchar(100) NOT NULL,
              first_name varchar(50),
              last_name varchar(50),
              password varchar(100) NOT NULL,
              refresh_token varchar(200)
          );
      `);

      await queryRunner.query(`
          CREATE TABLE products (
              created_at timestamp with time zone NOT NULL DEFAULT now(),
              created_by uuid,
              updated_at timestamp with time zone NOT NULL DEFAULT now(),
              updated_by uuid,
              id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
              barcode varchar(13) NOT NULL,
              name varchar(100) NOT NULL,
              description text,
              active boolean NOT NULL DEFAULT true,
              price integer NOT NULL,
              image varchar(255),
              leaf_category_id uuid NOT NULL,

              CONSTRAINT fk_products_category FOREIGN KEY (leaf_category_id) REFERENCES categories(id)
          );
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`
          DROP TABLE products;
      `);

      await queryRunner.query(`
          DROP TABLE users;
      `);

      await queryRunner.query(`
          DROP TABLE categories;
      `);

      await queryRunner.query(`
          DROP EXTENSION IF EXISTS "uuid-ossp";
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
