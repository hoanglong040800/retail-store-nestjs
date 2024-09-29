import { Injectable } from '@nestjs/common';
import { AdminDivisionsRepo } from './admin-divisions.repo';

@Injectable()
export class AdminDivisionsService {
  constructor(private readonly repo: AdminDivisionsRepo) {}
}
