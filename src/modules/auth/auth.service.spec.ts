import { Test, TestingModule } from '@nestjs/testing';
import { CustomException } from '@/guard';
import { UsersRepo, UsersService } from '@/modules/users';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { EUser } from '@/db/entities';
import { AuthService } from './auth.service';
import { SignedTokenData, SignedTokenUser } from './auth.type';
import { LoginDto, TokenDto } from '@/db/dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let srv: AuthService;
  let usersRepo: Repository<EUser>;
  let usersSrv: UsersService;
  let jwtSrv: JwtService;

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
      ],
    }).compile();

    srv = module.get<AuthService>(AuthService);
    usersRepo = module.get<Repository<EUser>>(UsersRepo);
    usersSrv = module.get<UsersService>(UsersService);
    jwtSrv = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(srv).toBeDefined();
  });

  describe('genJwtToken', () => {
    it('should throw error when user is null', async () => {
      await expect(
        srv.genJwtToken(null as unknown as SignedTokenUser, 'access'),
      ).rejects.toThrow();
    });

    it('should return token', async () => {
      const user = { id: '1', email: 'test@test.com' };
      const token = 'token';
      const fixedTime = new Date('2024-06-15T06:00:00.000Z').getTime();
      jest.spyOn(Date, 'now').mockReturnValueOnce(fixedTime);

      jwtSrv.signAsync = jest.fn().mockResolvedValue(token);

      const result = await srv.genJwtToken(user, 'access');

      expect(result).toStrictEqual({
        token,
        expireAt: new Date('2024-06-15T06:10:00.000Z'),
      });
    });
  });

  describe('genRefreshToken', () => {
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
        expireAt: new Date('2024-07-15T06:00:00.000Z'),
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
          firstName: 'test',
          lastName: 'test',
        },
      };

      const mockUserByEmail = {
        ...expectedResult.user,
        password: 'abc',
      } as EUser;

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