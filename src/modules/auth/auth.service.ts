import { Injectable } from '@nestjs/common';
import { LoginBody, RegisterBody } from './input/auth.input';
import { UsersRepo, UsersService } from '@/modules/users';
import { encryptString } from '@/utils';
import { compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { EUser } from '@/entities';
import { ENV } from '@/constants';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly usersSrv: UsersService,
  ) {}

  genJwtToken(
    user: Pick<EUser, 'id' | 'email' | 'firstName' | 'lastName'>,
    type: 'access' | 'refresh',
  ): string {
    if (!user) {
      return '';
    }

    const token = ENV.jwt[type];

    return sign({ user }, token.secret, {
      expiresIn: token.expire,
    });
  }

  async genRefreshToken(userId: string): Promise<string> {
    const refreshToken = this.genJwtToken({ id: userId }, 'refresh');

    await this.usersRepo.update(
      userId,
      { refreshToken },
      { updatedBy: userId },
    );

    return refreshToken;
  }

  async register(body: RegisterBody) {
    const { email, password } = body;

    const existUser = await this.usersSrv.findByEmail(email);

    if (existUser) {
      throw new Error('User already exist');
    }

    await this.usersRepo.save({
      ...body,
      password: encryptString(password),
    });
  }

  async login({ email, password }: LoginBody): Promise<LoginDto> {
    const existUser = await this.usersSrv.findByEmail(email, {select: ['id','password', 'email', 'firstName', 'lastName']});

    if (!existUser?.password || !existUser?.id) {
      throw new Error(`User not exist`);
    }

    if (!compareSync(password, existUser.password)) {
      throw new Error(`Password is incorrect`);
    }

    const accessToken = this.genJwtToken(existUser, 'access');
    const refreshToken = await this.genRefreshToken(existUser.id);

    return {
      accessToken,
      refreshToken,
      user: existUser,
    };
  }
}
