import { Test, TestingModule } from '@nestjs/testing';
import { CustomException } from '@/guard';
import { UsersRepo, UsersService } from '@/modules/users';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ECart, EUser } from '@/db/entities';
import { AuthService } from './auth.service';
import { SignedTokenData, SignedTokenUser } from './auth.type';
import { LoginDto, TokenDto } from '@/db/dto';
import * as bcrypt from 'bcrypt';
import { CartsService } from '../carts';
import { ENV } from '@/constants';

jest.mock('bcrypt', () => ({
  compareSync: jest.fn().mockImplementation(() => true),
}));

jest.mock('../../utils/crypt.utils', () => ({
  encryptString: jest.fn(() => 'encryptedString'),
}));

describe('AuthService', () => {
  let srv: AuthService;
  let usersRepo: Repository<EUser>;
  let usersSrv: UsersService;
  let jwtSrv: JwtService;
  let cartsSrv: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepo,
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
        {
          provide: CartsService,
          useValue: {
            getOrCreateUserCart: jest.fn(),
          },
        },
      ],
    }).compile();

    srv = module.get<AuthService>(AuthService);
    usersRepo = module.get<Repository<EUser>>(UsersRepo);
    usersSrv = module.get<UsersService>(UsersService);
    jwtSrv = module.get<JwtService>(JwtService);
    cartsSrv = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(srv).toBeDefined();
  });

  // UT: mock constant
  describe('genJwtToken', () => {
    const originalEnvJwt = ENV.jwt;

    beforeEach(() => {
      ENV.jwt = {
        access: {
          secret: 'secret',
          expire: '60',
        },

        refresh: {
          secret: 'secret',
          expire: '120',
        },
      };
    });

    afterAll(() => {
      ENV.jwt = originalEnvJwt;
    });

    it('should throw error when user is null', async () => {
      await expect(
        srv.genJwtToken(null as unknown as SignedTokenUser, 'access'),
      ).rejects.toThrow();
    });

    // UT: mock time
    it('should return token', async () => {
      const user = { id: '1', email: 'test@test.com' };
      const token = 'token';
      const fixedTime = new Date('2024-06-15T06:00:00.000Z').getTime();
      jest.spyOn(Date, 'now').mockReturnValueOnce(fixedTime);

      jwtSrv.signAsync = jest.fn().mockResolvedValue(token);

      const result = await srv.genJwtToken(user, 'access');

      expect(result).toStrictEqual({
        token,
        expireAt: new Date('2024-06-15T07:00:00.000Z'),
      });
    });
  });

  describe('genRefreshToken', () => {
    const originalEnvJwt = ENV.jwt;

    beforeEach(() => {
      ENV.jwt = {
        access: {
          secret: 'secret',
          expire: '60',
        },

        refresh: {
          secret: 'secret',
          expire: '120',
        },
      };
    });

    afterAll(() => {
      ENV.jwt = originalEnvJwt;
    });

    it('should throw error when userId is empty', async () => {
      await expect(srv.genRefreshToken('')).rejects.toThrow(CustomException);
    });

    it('should return token', async () => {
      const userId = '1';
      const token = 'token';
      const fixedTime = new Date('2024-06-15T06:00:00.000Z').getTime();
      jest.spyOn(Date, 'now').mockReturnValueOnce(fixedTime);
      jwtSrv.signAsync = jest.fn().mockResolvedValue(token);

      const result = await srv.genRefreshToken(userId);

      expect(result).toStrictEqual({
        token,
        expireAt: new Date('2024-06-15T08:00:00.000Z'),
      });
    });
  });

  describe('extractAndValdiateAccessToken', () => {
    const accessToken: TokenDto = { token: 'token', expireAt: new Date() };

    it('should throw error when accessToken is null', async () => {
      await expect(
        srv.extractAndValdiateAccessToken(null as any),
      ).rejects.toThrow(CustomException);
    });

    it('should throw error when decode return invalid', () => {
      jest.spyOn(jwtSrv, 'decode').mockReturnValueOnce({});

      expect(srv.extractAndValdiateAccessToken(accessToken)).rejects.toThrow(
        CustomException,
      );
    });

    it('should throw error when decode return invalid', () => {
      jest.spyOn(jwtSrv, 'decode').mockReturnValueOnce({ user: { id: '123' } });
      jest.spyOn(usersSrv, 'findOne').mockResolvedValueOnce(null as any);

      expect(srv.extractAndValdiateAccessToken(accessToken)).rejects.toThrow(
        CustomException,
      );
    });

    it('should return payload', async () => {
      const payload: SignedTokenData = {
        user: { id: '1', email: 'test@test.com' },
      };

      jest
        .spyOn(jwtSrv, 'decode')
        .mockReturnValueOnce(Promise.resolve(payload));

      jest
        .spyOn(usersSrv, 'findOne')
        .mockResolvedValueOnce({ id: 'abc' } as EUser);

      const result = await srv.extractAndValdiateAccessToken(accessToken);

      expect(result).toEqual(payload);
    });
  });

  describe('register', () => {
    it('should throw error when user exists', async () => {
      const body = { email: 'test@test.com', password: 'password' };

      usersSrv.findByEmail = jest.fn().mockResolvedValue({});

      await expect(srv.register(body)).rejects.toThrow(CustomException);
    });

    it('should return result', async () => {
      const body = { email: 'test@test.com', password: 'password' };

      usersSrv.findByEmail = jest.fn().mockResolvedValue(null);
      jest
        .spyOn(usersRepo, 'save')
        .mockResolvedValueOnce({ id: '123' } as EUser);

      const result = await srv.register(body);

      expect(result.result).toEqual(true);
    });
  });

  describe('login', () => {
    it('should throw error when user is null', async () => {
      const body = { email: 'test@test.com', password: 'password' };

      usersSrv.findByEmail = jest.fn().mockResolvedValue(null);

      await expect(srv.login(body)).rejects.toThrow(CustomException);
    });

    it('should throw error when password is incorrect', async () => {
      const body = { email: 'test@test.com', password: 'password' };

      usersSrv.findByEmail = jest.fn().mockResolvedValue({
        id: '1',
        password: 'incorrect',
      });

      jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(false);

      await expect(srv.login(body)).rejects.toThrow(CustomException);
    });

    it('should return result', async () => {
      const body = { email: 'test@test.com', password: 'password' };
      const mockAccessToken: TokenDto = {
        token: 'accessToken',
        expireAt: new Date(),
      };

      const mockRefreshToken: TokenDto = {
        token: 'accessToken',
        expireAt: new Date(),
      };

      const expectedResult: LoginDto = {
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
        user: {
          id: '1',
          email: 'test@test.com',
          firstName: 'firstName',
          lastName: 'lastName',
          cartId: 'cartId',
        },
      };

      const mockUserByEmail = {
        ...expectedResult.user,
        password: 'abc',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as EUser;

      const mockGetOrCreateUserCart: ECart = {
        id: expectedResult.user.cartId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // UT: mock library
      jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);

      // UT: mock function in service
      jest
        .spyOn(usersSrv, 'findByEmail')
        .mockResolvedValueOnce(mockUserByEmail);

      jest.spyOn(srv, 'genJwtToken').mockResolvedValueOnce(mockAccessToken);

      jest
        .spyOn(srv, 'genRefreshToken')
        .mockResolvedValueOnce(mockRefreshToken);

      jest
        .spyOn(cartsSrv, 'getOrCreateUserCart')
        .mockResolvedValueOnce(mockGetOrCreateUserCart);

      const result = await srv.login(body);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('refreshToken', () => {
    it('should throw error when extractAndValdiateAccessToken return null', async () => {
      jest
        .spyOn(srv, 'extractAndValdiateAccessToken')
        .mockResolvedValueOnce(null as any);

      await expect(
        srv.refreshToken({ accessToken: null as any }),
      ).rejects.toThrow(CustomException);
    });

    it('should return new accessToken', async () => {
      const accessToken: TokenDto = { token: 'token', expireAt: new Date() };
      const newAccessToken: TokenDto = {
        token: 'new token',
        expireAt: new Date(),
      };
      const signedTokenData: SignedTokenData = {
        user: { id: '1', email: 'test@test.com' },
      };

      jest
        .spyOn(srv, 'extractAndValdiateAccessToken')
        .mockResolvedValueOnce(signedTokenData);

      jest.spyOn(srv, 'genJwtToken').mockResolvedValueOnce(newAccessToken);

      const result = await srv.refreshToken({ accessToken });

      expect(result.accessToken).toEqual(newAccessToken);
    });
  });
});
