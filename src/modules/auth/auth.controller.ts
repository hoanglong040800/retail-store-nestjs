import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  LoginAdminDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from '@/db/dto';
import {
  LoginAdminBody,
  LoginBody,
  RefreshTokenBody,
  RegisterBody,
} from '@/db/input';
import { loginBackOfficeParamOptions } from './auth.swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterBody): Promise<RegisterDto> {
    return await this.authSrv.register(body);
  }

  @ApiBody({
    type: LoginBody,
    examples: {
      a: {
        summary: 'Normal Login',
        value: {
          email: 'qwer@gmail.com',
          password: 'qwer1234',
        },
      },
    },
  })
  @Post('/login')
  async login(@Body() body: LoginBody): Promise<LoginDto> {
    return await this.authSrv.login(body);
  }

  @ApiBody(loginBackOfficeParamOptions)
  @Post('/login-back-office')
  async loginBackOffice(@Body() body: LoginAdminBody): Promise<LoginAdminDto> {
    return await this.authSrv.loginBackOffice(body);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenBody): Promise<RefreshTokenDto> {
    return await this.authSrv.refreshToken(body);
  }
}
