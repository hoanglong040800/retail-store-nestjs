import { Injectable } from '@nestjs/common';
import { BaseRepo } from '../_base';
import { ECartItem } from '@/db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemsRepo extends BaseRepo<ECartItem> {
  constructor(
    @InjectRepository(ECartItem)
    private readonly repo: Repository<ECartItem>,
  ) {
    super();
  }
}
