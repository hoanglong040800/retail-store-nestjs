import { Injectable } from '@nestjs/common';
import { CartItemsRepo } from './cart-items.repo';

@Injectable()
export class CartItemsService {
  constructor(private readonly repo: CartItemsRepo) {}
}
