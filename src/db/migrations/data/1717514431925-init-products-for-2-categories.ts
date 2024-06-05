import { ECategory, EProduct } from '@/db/entities';
import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import {
  MockProduct,
  productsByCategoryNameV1,
} from '../dataset/products.data';
import { IProduct } from '@/db/interface';

export class InitProductsFor2Categories1717514431925
  implements MigrationInterface
{
  productRepo: Repository<EProduct>;
  categoryRepo: Repository<ECategory>;

  async saveProduct(product: MockProduct, categoryId: string) {
    if (!product || !categoryId) {
      return;
    }

    const newProduct: IProduct = {
      barcode: product.productCode,
      name: product.name,
      description: '',
      active: true,
      price: product.sysPriceOnBill,
      image: product.avatar,
      leafCategoryId: categoryId,
    };

    return this.productRepo.save(newProduct);
  }

  async saveAllProductsInCategory(products: MockProduct[], categoryId: string) {
    return Promise.all(
      products.map((product) => {
        return this.saveProduct(product, categoryId);
      }),
    );
  }

  async saveAllProductByDataset(products: MockProduct[], categoryName: string) {
    const category = await this.categoryRepo.findOne({
      select: ['id'],
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return;
    }

    return this.saveAllProductsInCategory(products, category.id);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.productRepo = queryRunner.connection.getRepository(EProduct);
    this.categoryRepo = queryRunner.connection.getRepository(ECategory);

    await Promise.all(
      Object.keys(productsByCategoryNameV1).map(async (categoryName: string) =>
        this.saveAllProductByDataset(
          productsByCategoryNameV1[categoryName],
          categoryName,
        ),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(EProduct)
      .delete({ active: true });
  }
}
