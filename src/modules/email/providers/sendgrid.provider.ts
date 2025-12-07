import { Injectable } from '@nestjs/common';
import {
  BaseEmailProvider,
  SendEmailParams,
  SendEmailRes,
} from '../email-provider.interface';

@Injectable()
export class SendgridProvider implements BaseEmailProvider {
  constructor() {}

  async send(): Promise<SendEmailRes> {
    return {
      success: true,
    };
  }
}
