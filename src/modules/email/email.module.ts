import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { InitEmailProvider } from './init-email-provider';
import { SendgridProvider } from './providers/sendgrid.provider';
import { EmailController } from './email.controller';

@Module({
  providers: [InitEmailProvider, EmailService, SendgridProvider],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
