import { LoginAdminBody } from '@/db/input';
import { ApiParamOptions } from '@nestjs/swagger';

export const loginBackOfficeParamOptions: ApiParamOptions = {
  type: LoginAdminBody,
  name: 'body',

  examples: {
    'Login Success': {
      value: {
        email: 'qwer@gmail.com',
        password: 'qwer1234',
      },
    },
  },
};
