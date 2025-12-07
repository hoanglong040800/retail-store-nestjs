import { Injectable } from '@nestjs/common';
import {
  BaseEmailProvider,
  SendEmailParams,
  SendEmailRes,
} from '../email-provider.interface';
import { MailDataRequired, default as SendGrid } from '@sendgrid/mail';
import { ENV } from '@/constants/env.const';
import { TryCatch } from '@/modules/_base';

@Injectable()
export class SendgridProvider implements BaseEmailProvider {
  constructor() {
    SendGrid.setApiKey(ENV.sendgrid.apiKey);
  }

  @TryCatch()
  async send(params: SendEmailParams): Promise<SendEmailRes> {
    const payload: MailDataRequired = {
      subject: params.subject,
      from: params.from,
      text: params.body,
      to: params.to,
    };

    await SendGrid.send(payload);

    return {
      success: true,
    };
  }
}
