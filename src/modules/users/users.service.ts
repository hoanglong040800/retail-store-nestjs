import { Injectable } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { EUser } from '@/db/entities';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async findAll(): Promise<EUser[]> {
    return this.usersRepo.find();
  }

  async findOne(id: string): Promise<EUser> {
    return this.usersRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(
    email: string,
    options?: FindOneOptions<EUser>,
  ): Promise<EUser | null> {
    try {
      return await this.usersRepo.findOne({
        ...(options || {}),
        where: {
          email,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
