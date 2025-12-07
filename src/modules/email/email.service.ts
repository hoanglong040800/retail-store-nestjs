import { Inject, Injectable } from '@nestjs/common';
import {
  BaseEmailProvider,
  SendEmailRes,
} from './email-provider.interface';
import { EMAIL_PROVIDER_NAME } from './init-email-provider';
import { SendEmailInput } from '@/db/input/email.input';

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

  async send({to}: SendEmailInput): Promise<SendEmailRes> {
    return this.emailProvider.send({
      from: 'no-reply@example.com',
      to,
      subject: 'Test Email',
      body: 'This is a test email',
    });
  }
}
