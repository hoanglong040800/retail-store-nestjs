import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ForgotPasswordDto,
  LoginAdminDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  VerifyOtpBackOfficeDto,
} from '@/db/dto';
import {
  ForgotPasswordBody,
  LoginAdminBody,
  LoginBody,
  RefreshTokenBody,
  RegisterBody,
  ResendOtpBackOfficeBody,
  ResetPasswordBody,
  VerifyOtpBackOfficeBody,
} from '@/db/input';
import { loginBackOfficeParamOptions } from './auth.swagger';
import { TransformDto } from '@/interceptors/response-transform.interceptor';

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
  @TransformDto(LoginDto)
  async login(@Body() body: LoginBody): Promise<LoginDto> {
    return await this.authSrv.login(body);
  }

  @ApiBody(loginBackOfficeParamOptions)
  @Post('/login-back-office')
  @TransformDto(LoginAdminDto)
  async loginBackOffice(@Body() body: LoginAdminBody): Promise<LoginAdminDto> {
    return await this.authSrv.loginBackOffice(body);
  }

  @Post('/verify-otp-back-office')
  @TransformDto(VerifyOtpBackOfficeDto)
  async verifyOtpBackOffice(
    @Body() body: VerifyOtpBackOfficeBody,
  ): Promise<VerifyOtpBackOfficeDto> {
    return await this.authSrv.verifyOtpBackOffice(body);
  }

  @Post('/resend-otp-back-office')
  async resendOtpBackOffice(
    @Body() body: ResendOtpBackOfficeBody,
  ): Promise<boolean> {
    return await this.authSrv.resendOtpBackOffice(body);
  }

  @Post('/refresh-token')
  @TransformDto(RefreshTokenDto)
  async refreshToken(@Body() body: RefreshTokenBody): Promise<RefreshTokenDto> {
    return await this.authSrv.refreshToken(body);
  }

  @Post('/forgot-password')
  @TransformDto(ForgotPasswordDto)
  async forgotPassword(
    @Body() body: ForgotPasswordBody,
  ): Promise<ForgotPasswordDto> {
    return await this.authSrv.forgotPassword(body);
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordBody): Promise<boolean> {
    return await this.authSrv.resetPassword(body);
  }
}
