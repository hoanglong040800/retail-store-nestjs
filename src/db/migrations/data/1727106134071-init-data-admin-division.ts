import { EAdminDivision } from '@/db/entities';
import { AdminDivisionType } from '@/db/enum';
import { IAdminDivisionHierarchy } from '@/db/interface';
import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import ADMIN_DIVISION_DATA from '../dataset/admin_division_hierarchy.json';

export class InitDataAdminDivision1727106134071 implements MigrationInterface {
  adminDivRepo: Repository<EAdminDivision>;

  async insertAdminData(
    provinceData: any,
    type: AdminDivisionType,
    parentId?: string,
  ): Promise<EAdminDivision> {
    const adminDivisionItem: IAdminDivisionHierarchy = {
      type,
      name: provinceData.Name,
      fullname: provinceData.FullName,
      code: provinceData.Code,
      parentId,
    };

    return this.adminDivRepo.save(adminDivisionItem);
  }

  async insertWards(wardData: any[], districtId: string): Promise<void> {
    if (!wardData || !districtId) {
      return;
    }

    const promises = wardData.map(async (item) => {
      return this.insertAdminData(item, AdminDivisionType.ward, districtId);
    });

    await Promise.all(promises);
  }

  async insertDistricts(districtData: any[], provinceId: string) {
    if (!districtData || !provinceId) {
      return;
    }

    const promises = districtData.map(async (item) => {
      const district = await this.insertAdminData(
        item,
        AdminDivisionType.district,
        provinceId,
      );

      return this.insertWards(item.Ward, district.id);
    });

    await Promise.all(promises);
  }

  async insertProvinces(): Promise<void> {
    const promises = ADMIN_DIVISION_DATA.map(async (item) => {
      const province = await this.insertAdminData(
        item,
        AdminDivisionType.province,
      );

      return this.insertDistricts(item.District, province.id);
    });

    await Promise.all(promises);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.adminDivRepo = queryRunner.connection.getRepository(EAdminDivision);

    await this.insertProvinces();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(EAdminDivision).delete({});
  }
}
