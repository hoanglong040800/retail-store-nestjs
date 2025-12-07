import { Provider } from '@nestjs/common';
import { SendgridProvider } from './providers/sendgrid.provider';

export const EMAIL_PROVIDER_NAME = 'EMAIL_PROVIDER';

export const InitEmailProvider: Provider = {
  provide: EMAIL_PROVIDER_NAME,
  inject: [SendgridProvider],

  useFactory: (sendgridProvider: SendgridProvider) => {
    if (true) {
      return sendgridProvider
    }
  },
};
