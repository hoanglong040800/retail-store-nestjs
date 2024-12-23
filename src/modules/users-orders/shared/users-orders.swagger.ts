import { ApiParamOptions } from '@nestjs/swagger';

export const getUserOrdersParamsOptions: ApiParamOptions = {
  type: String,
  name: 'userId',
  examples: {
    default: {
      value: '9c547dcc-4661-4f6f-8e3c-6f056f39bb5b',
    },
  },
};
