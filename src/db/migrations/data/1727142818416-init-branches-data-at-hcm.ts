import { In, MigrationInterface, QueryRunner, Repository } from 'typeorm';
import HCM_BRANCHES from '../dataset/branches-hcm.json';
import { EAdminDivision, EBranch } from '@/db/entities';
import { AdminDivisionType } from '@/db/enum';

type DistrictKey = keyof typeof HCM_BRANCHES;
type WardKey = keyof (typeof HCM_BRANCHES)[DistrictKey];

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
  ): Promise<EBranch> {
    return this.branchRepo.save({
      name: branchData.Name,
      districtId,
      provinceId,
      wardId,
      isActive: true,
    });
  }

  async handleWardData(
    districtDiv: EAdminDivision,
    provinceDiv: EAdminDivision,
  ): Promise<void> {
    const wardNames = Object.keys(
      HCM_BRANCHES[provinceDiv.name as DistrictKey][
        districtDiv.name as WardKey
      ],
    );

    const wardAdDivs = await this.adminDivRepo.find({
      where: { type: AdminDivisionType.ward, name: In(wardNames) },
    });

    const promises = wardAdDivs?.map(async (wardDiv) => {
      return this.insertBranchData(wardDiv, {
        provinceId: provinceDiv.id,
        districtId: districtDiv.id,
        wardId: wardDiv.id,
      });
    });

    Promise.all(promises);
  }

  async handleDistrictData(provinceDiv: EAdminDivision): Promise<any> {
    const districtNames = Object.keys(
      HCM_BRANCHES[provinceDiv.name as DistrictKey],
    );

    const districtAdDivs = await this.adminDivRepo.find({
      select: ['id', 'name'],
      where: { type: AdminDivisionType.district, name: In(districtNames) },
    });

    const promises = districtAdDivs?.map(async (districtDiv) => {
      return this.handleWardData(districtDiv, provinceDiv);
    });

    return promises;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.branchRepo = queryRunner.connection.getRepository(EBranch);
    this.adminDivRepo = queryRunner.connection.getRepository(EAdminDivision);

    const provincesName = Object.keys(HCM_BRANCHES);

    const provinceAdminDivisions = await this.adminDivRepo.find({
      select: ['id', 'name'],
      where: { type: AdminDivisionType.province, name: In(provincesName) },
    });

    // const promises = provinceAdminDivisions?.map((provinceDiv) =>
    //   this.handleDistrictData(provinceDiv),
    // );

    const promises = provinceAdminDivisions?.map(this.handleDistrictData);

    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(EBranch).delete({});
  }
}
