export abstract class BaseEmailProvider {
  abstract send(params: SendEmailParams): Promise<SendEmailRes>;
}

export type SendEmailParams = {
  from: string;
  to: string;
  subject: string;
  body: string;
};

export type SendEmailRes = {
  success: boolean;
};
