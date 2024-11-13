import { Injectable } from '@nestjs/common';
import { OrdersRepo } from './orders.repo';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepo) {}
}
