import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { ECart, EUser } from '@/db/entities';
import { FindOneOptions } from 'typeorm';
import { CartsService } from '../carts';
import { UserDto } from '@/db/dto';
import { CustomException } from '@/guard';
import { UpdatePasswordParams } from './users.type';
import { validateAndTransformResponse } from '@/utils/common.util';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly cartsSrv: CartsService,
  ) {}

  async findAll(): Promise<EUser[]> {
    return this.usersRepo.find();
  }

  async findOne(id: string): Promise<UserDto> {
    const user: EUser = await this.usersRepo.findOne({
      select: ['id', 'email', 'lastName', 'otpCode'],
      where: {
        id,
      },
    });

    const userCart: ECart = await this.cartsSrv.getOrCreateUserCart({
      userId: user.id,
    });

    if (!userCart) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const userResult: UserDto = {
      ...user,
      cartId: userCart.id,
    };

    return validateAndTransformResponse(UserDto, userResult);
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
          ...(options?.where || {}),
        },
      });
    } catch (error) {
      return null;
    }
  }

  async updateLoginAttempts(
    userId: string,
    loginAttempts: number,
  ): Promise<boolean> {
    await this.usersRepo.update(userId, { loginAttempts }, { id: userId });
    return true;
  }

  async getAdminUserForLogin({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }): Promise<EUser | null> {
    if (!email && !userId) {
      throw new CustomException('PARAMS_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    const result = await this.usersRepo.findOne({
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'branchId',
        'role',
        'password',
        'loginAttempts',
        'otpCode',
      ],
      where: {
        email,
        id: userId,
      },
    });

    return result;
  }

  async updatePassword({
    id,
    password,
  }: UpdatePasswordParams): Promise<boolean> {
    await this.usersRepo.update(id, { password }, { id: id });
    return true;
  }
}
