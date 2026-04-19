import { EmailTemplateEnum } from '@/db/enum/email.enum';
import { SendEmailParams } from './email-provider.interface';

export type EmailTemplateData = {
  subject: string;
  body: string;
};

export type GetDataByEmailTemplate = Record<EmailTemplateEnum, any>;

export type EmailTemplateParams = {
  otpCode: string;
};

export type EmailParamByTemplate = {
  [EmailTemplateEnum.BackOfficeOtp]: {
    otpCode: string;
  };

  [EmailTemplateEnum.Welcome]: {
    firstName: string;
  };
};

export type EmailDataByTemplates = {
  [K in EmailTemplateEnum]: {
    template: K;
    params: EmailParamByTemplate[K];
  };
}[EmailTemplateEnum];

export type SendEmailTemplateParams = SendEmailParams & EmailDataByTemplates;
