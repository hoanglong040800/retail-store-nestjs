import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBody, RegisterBody } from '@/modules/auth/input';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterBody) {
    return await this.authSrv.register(body);
  }

  @ApiBody({
    type: LoginBody,
    examples: {
      a: {
        summary: 'Normal Login',
        value: {
          email: 'asdf@gmail.com',
          password: '12345678',
        },
      },
    },
  })
  @Post('/login')
  async regsiter(@Body() body: LoginBody): Promise<LoginDto> {
    return await this.authSrv.login(body);
  }
}
