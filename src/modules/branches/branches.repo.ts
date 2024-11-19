import { EBranch } from '@/db/entities';
import { BaseRepo } from '../_base';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BranchesRepo extends BaseRepo<EBranch> {
  constructor(
    @InjectRepository(EBranch)
    private readonly repo: Repository<EBranch>,
  ) {
    super();
  }

  /**
   * Always prioriize smallest division because admin division is master data, only need 1 source of truth
   */
  private getWhereClauseFilterBranches(
    optionsWhere: FindOptionsWhere<EBranch>,
  ): FindOptionsWhere<EBranch> {
    if (!optionsWhere) {
      return optionsWhere;
    }

    if (optionsWhere.wardId) {
      delete optionsWhere.district;
      delete optionsWhere.districtId;
      delete optionsWhere.province;
      delete optionsWhere.provinceId;
    }
    //
    else if (optionsWhere.districtId) {
      delete optionsWhere.province;
      delete optionsWhere.provinceId;
    }

    return optionsWhere;
  }

  find(options?: FindManyOptions<EBranch> | undefined): Promise<EBranch[]> {
    if (options?.where && !Array.isArray(options.where)) {
      options.where = this.getWhereClauseFilterBranches(options.where);
    }

    return this.repo.find({
      ...(options || {}),

      where: options?.where,
    });
  }

  findOne(options: FindOneOptions<EBranch>): Promise<EBranch | null> {
    if (options?.where && !Array.isArray(options.where)) {
      options.where = this.getWhereClauseFilterBranches(options.where);
    }

    return this.repo.findOne(options);
  }
}
