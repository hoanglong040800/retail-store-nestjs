import { Injectable } from '@nestjs/common';
import { LoginBody, RegisterBody } from './input/auth.input';
import { UsersRepo, UsersService } from '@/modules/users';
import { encryptString } from '@/utils';
import { compareSync } from 'bcrypt';
import { EUser } from '@/entities';
import { LoginDto, TokenDto, JwtTokenType } from './dto';
import { calculateExpireTime } from './auth.util';
import { ENV } from '@/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly usersSrv: UsersService,
    private readonly jwtSrv: JwtService,
  ) {}

  async genJwtToken(
    user: Pick<EUser, 'id' | 'email' | 'firstName' | 'lastName'>,
    type: JwtTokenType,
  ): Promise<TokenDto> {
    if (!user) {
      throw new Error(`Missing user when generate JWT Token`);
    }

    const envToken = ENV.jwt[type];

    const token = await this.jwtSrv.signAsync(
      { user },
      {
        secret: envToken.secret,
        expiresIn: `999999d`,
      },
    );

    return {
      token,
      expireAt: calculateExpireTime(envToken.expire),
    };
  }

  async genRefreshToken(userId: string): Promise<TokenDto> {
    const refreshToken = await this.genJwtToken({ id: userId }, 'refresh');

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

    const accessToken = await this.genJwtToken(existUser, 'access');
    const refreshToken = await this.genRefreshToken(existUser.id);

    return {
      accessToken,
      refreshToken,
      user: existUser,
    };
  }
}
