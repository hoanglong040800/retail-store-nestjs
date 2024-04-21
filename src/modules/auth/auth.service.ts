import { Injectable } from '@nestjs/common';
import { LoginBody, RegisterBody } from './input/auth.input';
import { UsersRepo, UsersService } from '@/modules/users';
import { encryptString } from '@/utils';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EUser } from '@/entities';
import { LoginDto, TokenDto, JwtTokenType } from './dto';
import { calculateExpireTime } from './auth.util';
import { ENV, JwtTokenUnit } from '@/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly usersSrv: UsersService,
  ) {}

  genJwtToken(
    user: Pick<EUser, 'id' | 'email' | 'firstName' | 'lastName'>,
    type: JwtTokenType,
  ): TokenDto {
    if (!user) {
      throw new Error(`Missing user when generate JWT Token`);
    }

    const envToken = ENV.jwt[type];

    const token = sign({ user }, envToken.secret, {
      expiresIn: `${envToken.expire}${JwtTokenUnit}`,
    });

    return {
      token,
      expireAt: calculateExpireTime(envToken.expire),
    };
  }

  async genRefreshToken(userId: string): Promise<TokenDto> {
    const refreshToken = this.genJwtToken({ id: userId }, 'refresh');

    await this.usersRepo.update(
      userId,
      { refreshToken: refreshToken.token },
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
    const existUser = await this.usersSrv.findByEmail(email, {
      select: ['id', 'password', 'email', 'firstName', 'lastName'],
    });

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
