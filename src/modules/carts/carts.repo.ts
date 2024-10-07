import { ECart } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CartsRepo {
  constructor(
    @InjectRepository(ECart) private readonly repo: Repository<ECart>,
  ) {}
}
