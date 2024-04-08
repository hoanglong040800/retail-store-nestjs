import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUser } from 'src/entities';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectRepository(EUser)
    private readonly repo: Repository<EUser>,
  ) {}

  async findAll(options?: FindManyOptions<EUser>): Promise<EUser[]> {
    return await this.repo.find(options);
  }
}
