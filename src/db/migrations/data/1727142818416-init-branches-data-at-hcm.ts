import { In, MigrationInterface, QueryRunner, Repository } from 'typeorm';
import HCM_BRANCHES from '../dataset/branches-hcm.json';
import { EAdminDivision, EBranch } from '@/db/entities';
import { AdminDivisionType } from '@/db/enum';

type ProvinceKey = keyof typeof HCM_BRANCHES;
type DistrictKey = keyof (typeof HCM_BRANCHES)[ProvinceKey];
type WardKey = keyof (typeof HCM_BRANCHES)[ProvinceKey][DistrictKey];

export class InitBranchesDataAtHcm1727142818416 implements MigrationInterface {
  branchRepo: Repository<EBranch>;
  adminDivRepo: Repository<EAdminDivision>;

  async insertBranchData(
    branchData: any,
    {
      districtId,
      provinceId,
      wardId,
    }: { districtId: string; provinceId: string; wardId: string },
  ): Promise<any> {
    const finalName = branchData.displayStoreName.replace(/BHX /g, '');

    await this.branchRepo.insert({
      name: finalName,
      wardId,
      provinceId,
      districtId,
    });
  }

  async insertMultipleBranches(
    branchesData: any[],
    adminDivisionIds: {
      districtId: string;
      provinceId: string;
      wardId: string;
    },
  ) {
    const promises = branchesData.map(async (item) =>
      this.insertBranchData(item, adminDivisionIds),
    );

    return await Promise.all(promises);
  }

  async handleWardData(
    districtDiv: EAdminDivision,
    provinceDiv: EAdminDivision,
  ): Promise<void> {
    const wardNames = Object.keys(
      HCM_BRANCHES[provinceDiv.name as ProvinceKey][
        districtDiv.name as DistrictKey
      ],
    );

    const wardAdDivs = await this.adminDivRepo.find({
      where: { type: AdminDivisionType.ward, name: In(wardNames) },
    });

    const promises = wardAdDivs?.map(async (wardDiv) => {
      const branchesData =
        HCM_BRANCHES[provinceDiv.name as ProvinceKey][
          districtDiv.name as DistrictKey
        ][wardDiv.name as WardKey];

      return this.insertMultipleBranches(branchesData, {
        districtId: districtDiv.id,
        provinceId: provinceDiv.id,
        wardId: wardDiv.id,
      });
    });

    await Promise.all(promises);
  }

  async handleDistrictData(provinceDiv: EAdminDivision): Promise<any> {
    const districtNames = Object.keys(
      HCM_BRANCHES[provinceDiv.name as ProvinceKey],
    );

    const districtAdDivs = await this.adminDivRepo.find({
      select: ['id', 'name'],
      where: { type: AdminDivisionType.district, name: In(districtNames) },
    });

    const promises = districtAdDivs?.map(async (districtDiv) => {
      return this.handleWardData(districtDiv, provinceDiv);
    });

    await Promise.all(promises);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.branchRepo = queryRunner.connection.getRepository(EBranch);
    this.adminDivRepo = queryRunner.connection.getRepository(EAdminDivision);

    const provincesName = Object.keys(HCM_BRANCHES);

    const provinceAdminDivisions = await this.adminDivRepo.find({
      select: ['id', 'name'],
      where: { type: AdminDivisionType.province, name: In(provincesName) },
    });

    const promises = provinceAdminDivisions?.map((provinceDiv) =>
      this.handleDistrictData(provinceDiv),
    );

    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(EBranch).delete({});
  }
}
