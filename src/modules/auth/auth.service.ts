import { HttpStatus, Injectable } from '@nestjs/common';
import {
  LoginAdminBody,
  LoginBody,
  RefreshTokenBody,
  RegisterBody,
} from '@/db/input';
import {
  LoginDto,
  TokenDto,
  JwtTokenType,
  RegisterDto,
  RefreshTokenDto,
  LoginUserDto,
  LoginAdminDto,
} from '@/db/dto';
import { UsersRepo, UsersService } from '@/modules/users';
import { encryptString } from '@/utils';
import { compareSync } from 'bcrypt';
import { calculateExpireTime } from './auth.util';
import { ENV, JwtTokenUnit } from '@/constants';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from '@/guard';
import {
  SignedTokenData,
  SignedTokenUser,
  ValidateLoginParams,
} from './auth.type';
import { CartsService } from '../carts';
import { EUser } from '@/db/entities';
import { UserRoleEnum } from '@/db/enum/user.enum';
import { ExceptionCode } from '@/db/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly usersSrv: UsersService,
    private readonly jwtSrv: JwtService,
    private readonly cartsSrv: CartsService,
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
        expiresIn: `${envToken.expire}${JwtTokenUnit}`,
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
      role: UserRoleEnum.Shopper,
      password: encryptString(password),
    });

    return { result: true };
  }

  async login({ email, password }: LoginBody): Promise<LoginDto> {
    const existUser = await this.usersSrv.findByEmail(email, {
      select: [
        'id',
        'password',
        'email',
        'firstName',
        'lastName',
        'branchId',
        'deliveryWard',
        'address',
        'role',
      ],

      relations: {
        deliveryWard: {
          parentDivision: {
            parentDivision: true,
          },
        },
      },
    });

    if (!existUser?.password || !existUser?.id) {
      throw new CustomException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (!compareSync(password, existUser.password)) {
      throw new CustomException(
        'INCORRECT_EMAIL_OR_PASSWORD',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCart = await this.cartsSrv.getOrCreateUserCart({
      userId: existUser.id,
    });

    if (!userCart) {
      throw new CustomException('USER_CART_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const { accessToken, refreshToken } =
      await this.generateLoginTokens(existUser);

    const loginUser: LoginUserDto = {
      id: existUser.id,
      email: existUser.email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      cartId: userCart.id,
      branchId: existUser.branchId,
      deliveryWard: existUser.deliveryWard,
      address: existUser.address,
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

  async loginBackOffice({
    email,
    password,
  }: LoginAdminBody): Promise<LoginAdminDto> {
    const user = await this.usersSrv.getAdminUserForLogin(email);

    if (!user) {
      throw new CustomException(
        'INCORRECT_EMAIL_OR_PASSWORD',
        HttpStatus.NOT_FOUND,
      );
    }

    this.validateLogin({ user, inputPassword: password });

    const [{ accessToken, refreshToken }] = await Promise.all([
      this.generateLoginTokens(user),
      this.usersSrv.updateLoginAttempts(user.id, 0),
    ]);

    const result: LoginAdminDto = {
      needVerifyOtp: false,

      userOtpToken: null,
      accessToken,
      refreshToken,
      // TODO implement auto transform DTO
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };

    return result;
  }

  // ---- PRIVATE ----

  private async generateLoginTokens(
    user: EUser,
  ): Promise<{ accessToken: TokenDto; refreshToken: TokenDto }> {
    const accessToken = await this.genJwtToken(user, 'access');
    const refreshToken = await this.genRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  private validateLogin({ user, inputPassword }: ValidateLoginParams) {
    const maxLoginAttempts = 5;

    try {
      if (user.loginAttempts && user.loginAttempts >= maxLoginAttempts) {
        throw new CustomException(
          'LOGIN_ATTEMPTS_EXCEEDED',
          HttpStatus.TOO_MANY_REQUESTS,
          `Login attempts exceeded`,
        );
      }

      if (!inputPassword) {
        throw new CustomException('PARAMS_NOT_FOUND', HttpStatus.BAD_REQUEST);
      }

      if (!compareSync(inputPassword, user.password)) {
        throw new CustomException(
          'INCORRECT_EMAIL_OR_PASSWORD',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      if ((e.errorCode as ExceptionCode) === 'LOGIN_ATTEMPTS_EXCEEDED') {
        throw e;
      }

      const nextLoginAttempt = (user.loginAttempts || 0) + 1;
      this.usersSrv.updateLoginAttempts(user.id, nextLoginAttempt).catch();
      
      throw e;
    }
  }
}
