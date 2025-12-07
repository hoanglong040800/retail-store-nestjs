import { SendEmailRes } from '@/modules/email/email-provider.interface';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailErrorDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class SendEmailDto implements SendEmailRes {
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  error?: SendEmailErrorDto;
}
