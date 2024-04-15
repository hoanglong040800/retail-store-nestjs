import { Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { EUser } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepo, TryCatch } from 'src/modules/_base';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersRepo extends BaseRepo<EUser> {
  constructor(
    @InjectRepository(EUser)
    private readonly repo: Repository<EUser>,
  ) {
    super();
  }

  @TryCatch()
  async find(options?: FindManyOptions<EUser>): Promise<EUser[]> {
    return this.repo.find(options);
  }

  @TryCatch()
  async findOne(options: FindOneOptions<EUser>): Promise<EUser | null> {
    if (!options) {
      throw new Error('Options is empty');
    }

    return this.repo.findOne(options);
  }

  @TryCatch()
  async create(createDto: CreateUserDto, auditUser: EUser): Promise<EUser> {
    return this.repo.create(createDto);
  }

  @TryCatch()
  async update(
    id: string,
    updateDto: UpdateUserDto,
    auditUser: EUser,
  ): Promise<EUser> {
    const updateResult: UpdateResult = await this.repo.update(id, {
      ...updateDto,
      updatedBy: auditUser.id,
    });

    if (!updateResult.affected) {
      throw new Error(`Entity is not available`);
    }

    const updatedRecord = await this.findOne({
      where: {
        id,
      },
    });

    if (!updatedRecord) {
      throw new Error(`Record is not available`);
    }

    return updatedRecord;
  }

  @TryCatch()
  async delete(id: string): Promise<boolean> {
    const deleteResult: DeleteResult = await this.repo.delete(id);

    if (!!deleteResult.affected) {
      return false;
    }

    return true;
  }
}
