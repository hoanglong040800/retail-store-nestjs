import { HttpStatus, Injectable } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { AuditUser, EUser } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepo, TryCatch } from '@/modules/_base';
import { DEFAULT_USER_ID } from '@/constants';
import { CreateUserDto, UpdateUserDto } from '@/db/dto';
import { CustomException } from '@/guard';

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
  async findOne(options: FindOneOptions<EUser>): Promise<EUser> {
    if (!options) {
      throw new CustomException(
        'INVALID_DATA',
        HttpStatus.BAD_REQUEST,
        'options is empty',
      );
    }

    const user = await this.repo.findOne(options);
    if (!user) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @TryCatch()
  async save(createDto: CreateUserDto): Promise<EUser> {
    return this.repo.save({
      ...createDto,
      createdBy: DEFAULT_USER_ID,
      updatedBy: DEFAULT_USER_ID,
    });
  }

  @TryCatch()
  async update(
    id: string,
    updateDto: UpdateUserDto,
    auditUser: AuditUser,
  ): Promise<EUser> {
    const updateResult: UpdateResult = await this.repo.update(id, {
      ...updateDto,
      updatedBy: auditUser.id,
    });

    if (!updateResult.affected) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedRecord = await this.findOne({
      where: {
        id,
      },
    });

    if (!updatedRecord) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
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
