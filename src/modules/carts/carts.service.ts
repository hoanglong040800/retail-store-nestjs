import { Injectable } from '@nestjs/common';
import { CartsRepo } from './carts.repo';
import { ECart } from '@/db/entities';
import { CartStatusEnum } from '@/db/enum';

@Injectable()
export class CartsService {
  constructor(private readonly repo: CartsRepo) {}

  // only use this function to get/create user cart -> avoid dup cart
  async getOrCreateUserCart({ userId }: { userId: string }): Promise<ECart> {
    const userActiveCart = await this.repo.findOne({
      relations: {
        user: true,
      },

      where: {
        status: CartStatusEnum.new,
        user: {
          id: userId,
        },
      },
    });

    if (userActiveCart) {
      return userActiveCart;
    }

    return this.repo.save(
      {
        user: {
          id: userId,
        },
      },

      { id: userId },
    );
  }
}
