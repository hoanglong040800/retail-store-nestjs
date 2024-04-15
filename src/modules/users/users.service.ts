import { Injectable } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { EUser } from 'src/entities';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async findAll(): Promise<EUser[]> {
    return this.usersRepo.find();
  }

  async findOne(id: string): Promise<EUser | null> {
    return this.usersRepo.findOne({
      where: {
        id,
      },
    });
  }
}
