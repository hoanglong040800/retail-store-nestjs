import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBody, RegisterBody } from '@/modules/auth/input';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterBody) {
    return await this.authSrv.register(body);
  }

  @Post('/login')
  async regsiter(@Body() body: LoginBody) {
    return await this.authSrv.login(body);
  }
}
