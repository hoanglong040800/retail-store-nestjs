import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { AuditUser, ECart, EUser } from '@/db/entities';
import { FindOneOptions } from 'typeorm';
import { CartsService } from '../carts';
import { UpdateUserDto, UserDto } from '@/db/dto';
import { CustomException } from '@/guard';
import { UserRoleEnum } from '@/db/enum/user.enum';

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

    return userResult;
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

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
    auditUser: AuditUser,
  ): Promise<EUser> {
    if (!userId || !updateUserDto) {
      throw new CustomException('PARAMS_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    return this.usersRepo.update(userId, updateUserDto, auditUser);
  }

  async resetLoginAttempts(userId: string): Promise<boolean> {
    await this.usersRepo.update(userId, { loginAttempts: 0 }, { id: userId });
    return true;
  }

  async getAdminUserForLogin(email: string): Promise<EUser> {
    const user = await this.findByEmail(email, {
      select: [
        'id',
        'password',
        'email',
        'firstName',
        'lastName',
        'role',
        'loginAttempts',
      ],
      where: {
        role: UserRoleEnum.Admin,
      },
    });

    if (!user) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
