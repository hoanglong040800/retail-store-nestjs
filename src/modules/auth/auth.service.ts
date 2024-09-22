import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginBody, RefreshTokenBody, RegisterBody } from '@/db/input';
import {
  LoginDto,
  TokenDto,
  JwtTokenType,
  RegisterDto,
  RefreshTokenDto,
  LoginUserDto,
} from '@/db/dto';
import { UsersRepo, UsersService } from '@/modules/users';
import { encryptString } from '@/utils';
import { compareSync } from 'bcrypt';
import { calculateExpireTime } from './auth.util';
import { ENV } from '@/constants';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from '@/guard';
import { SignedTokenData, SignedTokenUser } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly usersSrv: UsersService,
    private readonly jwtSrv: JwtService,
  ) {}

  async genJwtToken(
    user: SignedTokenUser,
    type: JwtTokenType,
  ): Promise<TokenDto> {
    if (!user) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const envToken = ENV.jwt[type];

    const token = await this.jwtSrv.signAsync(
      { user },
      {
        secret: envToken.secret,
        expiresIn: `1s`,
      },
    );

    return {
      token,
      expireAt: calculateExpireTime(envToken.expire),
    };
  }

  async genRefreshToken(userId: string): Promise<TokenDto> {
    if (!userId) {
      throw new CustomException(
        'PARAMS_NOT_FOUND',
        HttpStatus.NOT_FOUND,
        'userId empty',
      );
    }

    const refreshToken = await this.genJwtToken({ id: userId }, 'refresh');

    await this.usersRepo.update(
      userId,
      { refreshToken: refreshToken.token },
      { id: userId },
    );

    return refreshToken;
  }

  async extractAndValdiateAccessToken(
    accessToken: TokenDto,
  ): Promise<SignedTokenData> {
    if (!accessToken?.token) {
      throw new CustomException('PARAMS_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const payload: SignedTokenData = await this.jwtSrv.decode(
      accessToken.token,
    );

    if (!payload?.user?.id) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const user = await this.usersSrv.findOne(payload.user.id);

    if (!user) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return payload;
  }

  async register(body: RegisterBody): Promise<RegisterDto> {
    const { email, password } = body;

    const existUser = await this.usersSrv.findByEmail(email);

    if (existUser) {
      throw new CustomException('USER_EXISTS', HttpStatus.CONFLICT);
    }

    await this.usersRepo.save({
      ...body,
      password: encryptString(password),
    });

    return { result: true };
  }

  async login({ email, password }: LoginBody): Promise<LoginDto> {
    const existUser = await this.usersSrv.findByEmail(email, {
      select: ['id', 'password', 'email', 'firstName', 'lastName'],
    });

    if (!existUser?.password || !existUser?.id) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!compareSync(password, existUser.password)) {
      throw new CustomException('INCORRECT_PASSWORD', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await this.genJwtToken(existUser, 'access');
    const refreshToken = await this.genRefreshToken(existUser.id);

    const loginUser: LoginUserDto = {
      id: existUser.id,
      email: existUser.email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
    };

    return {
      accessToken,
      refreshToken,
      user: loginUser,
    };
  }

  async refreshToken({
    accessToken,
  }: RefreshTokenBody): Promise<RefreshTokenDto> {
    const accessPayload = await this.extractAndValdiateAccessToken(accessToken);

    if (!accessPayload) {
      throw new CustomException('INVALID_TOKEN', HttpStatus.BAD_REQUEST);
    }

    const newAccessToken: TokenDto = await this.genJwtToken(
      accessPayload.user,
      'access',
    );

    return {
      accessToken: newAccessToken,
    };
  }
}
