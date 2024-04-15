import { Injectable } from '@nestjs/common';
import { RegisterBody } from './input/register.input';
import { UsersRepo } from '@/modules/users';
import { encryptString } from '@/utils';


@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async checkUserExistByEmail(email: string): Promise<boolean> {
    const existUser = await this.usersRepo.findOne({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new Error('User already exist');
    }

    return false;
  }

  async register(body: RegisterBody) {
    const { email, password } = body;
    await this.checkUserExistByEmail(email);

    await this.usersRepo.save({
      ...body,
      password: encryptString(password)
    });
  }
}
