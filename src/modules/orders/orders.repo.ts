import { EOrder } from '@/db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepo {
  constructor(
    @InjectRepository(EOrder)
    private readonly repo: Repository<EOrder>,
  ) {}

  
}
