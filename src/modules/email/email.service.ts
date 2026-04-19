import { Inject, Injectable } from '@nestjs/common';
import { BaseEmailProvider } from './email-provider.interface';
import { EMAIL_PROVIDER_NAME } from './init-email-provider';
import { SendEmailInput } from '@/db/input/email.input';
import { ENV } from '@/constants/env.const';
import { SendEmailDto } from '@/db/dto/email.dto';
import { EmailDataByTemplates, SendEmailTemplateParams } from './email.types';
import { EmailTemplateEnum } from '@/db/enum/email.enum';

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

  async sendTemplate(input: SendEmailTemplateParams) {
    const { template, params, ...rest } = input;
    const emailTemplateData = await this.getEmailTemplateData({
      template,
      params,
    } as EmailDataByTemplates);

    return this.emailProvider.send({
      ...rest,
      from: ENV.settings.defaultEmailSender,
      subject: emailTemplateData.subject,
      body: emailTemplateData.body,
    });
  }

  private async getEmailTemplateData({
    template,
    params,
  }: EmailDataByTemplates) {
    switch (template) {
      case EmailTemplateEnum.BackOfficeOtp:
        return {
          subject: 'Back Office OTP',
          body: `Your verify code is ${params.otpCode}`,
        };

      case EmailTemplateEnum.Welcome:
        return {
          subject: 'Welcome to Retail Store',
          body: `Thank you ${params.firstName} for believe in us.`,
        };

      default:
        return {
          subject: 'Unknown Template',
          body: 'Unknown template',
        };
    }
  }
}
