import { EAdminDivision } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepo } from '../_base';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminDivisionsRepo extends BaseRepo<EAdminDivision> {
  constructor(
    @InjectRepository(EAdminDivision)
    private readonly repo: Repository<EAdminDivision>,
  ) {
    super();
  }
}
