import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCartsOrdersAlterProducts1727966021298
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE product_unit_enum as ENUM ('kg', 'litre', 'package', 'bottle', 'box', 'packet')    
    `);

    await queryRunner.query(`
        CREATE TYPE order_status_enum as ENUM ('pending', 'awaiting_fulfillment', 'awaiting_payment', 'awaiting_shipment', 'shipped', 'done', 'cancelled' )
    `);

    await queryRunner.query(`
        CREATE TYPE delivery_type_enum as ENUM ('delivery', 'pickup')    
    `);

    await queryRunner.query(`
        ALTER TABLE products
        ADD COLUMN unit product_unit_enum    
    `);

    await queryRunner.query(`
        CREATE TABLE carts (
            created_at timestamp with time zone NOT NULL DEFAULT now(),
            created_by uuid,
            updated_at timestamp with time zone NOT NULL DEFAULT now(),
            updated_by uuid,
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id uuid NOT NULL,
            
            FOREIGN KEY (user_id) REFERENCES users(id)
        )    
    `);

    await queryRunner.query(`
        CREATE TABLE cart_items (
            created_at timestamp with time zone NOT NULL DEFAULT now(),
            created_by uuid,
            updated_at timestamp with time zone NOT NULL DEFAULT now(),
            updated_by uuid,
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            quantity int NOT NULL CHECK (quantity > 0 and quantity <= 100),
            price float NOT NULL,
            cart_id uuid NOT NULL,
            product_id uuid NOT NULL,

            FOREIGN KEY (cart_id) REFERENCES carts(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `);

    await queryRunner.query(`
        CREATE TABLE orders (
            created_at timestamp with time zone NOT NULL DEFAULT now(),
            created_by uuid,
            updated_at timestamp with time zone NOT NULL DEFAULT now(),
            updated_by uuid,
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            status order_status_enum NOT NULL DEFAULT 'pending',
            address varchar(255),
            delivery_type delivery_type_enum NOT NULL DEFAULT 'delivery',
            
            user_id uuid NOT NULL,
            cart_id uuid NOT NULL,
            branch_id uuid NOT NULL,
            delivery_ward_id uuid,

            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (cart_id) REFERENCES carts(id),
            FOREIGN KEY (branch_id) REFERENCES branches(id),
            FOREIGN KEY (delivery_ward_id) REFERENCES admin_division_hierarchy(id)
        )    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE orders;
        DROP TABLE cart_items;
        DROP TABLE carts;
    `);

    await queryRunner.query(`
        ALTER TABLE products DROP COLUMN unit
    `);

    await queryRunner.query(`
        DROP TYPE product_unit_enum;
        DROP TYPE order_status_enum;
        DROP TYPE delivery_type_enum;
    `);
  }
}
