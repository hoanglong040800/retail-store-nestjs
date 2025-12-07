import { SendEmailInput } from '@/db/input/email.input';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { SendEmailDto } from '@/db/dto/email.dto';

@Controller('email')
@ApiTags('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: SendEmailInput): Promise<SendEmailDto> {
    return this.emailService.send(body);
  }
}
