import { Inject, Injectable } from '@nestjs/common';
import { BaseEmailProvider } from './email-provider.interface';
import { EMAIL_PROVIDER_NAME } from './init-email-provider';
import { SendEmailInput } from '@/db/input/email.input';
import { ENV } from '@/constants/env.const';
import { SendEmailDto } from '@/db/dto/email.dto';

@Injectable()
export class EmailService implements BaseEmailProvider {
  constructor(
    @Inject(EMAIL_PROVIDER_NAME)
    private readonly emailProvider: BaseEmailProvider,
  ) {
    if (!emailProvider) {
      throw new Error('Email provider not found');
    }
  }

  async send({ to }: SendEmailInput): Promise<SendEmailDto> {
    return this.emailProvider.send({
      from: ENV.settings.defaultEmailSender,
      to,
      subject: 'Test Email',
      body: 'This is a test email',
    });
  }
}
