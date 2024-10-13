import { AddCartItemBody } from '@/db/input';
import { ApiParamOptions } from '@nestjs/swagger';

export const addCartItemsParamOptions: ApiParamOptions = {
  type: String,
  name: 'cartId',
  examples: {
    'Valid Cart Id': {
      value: '1096ac51-d290-4ee9-83c7-d997dbe07893',
    },
  },
};

export const addCartItemsBodyOptions: ApiParamOptions = {
  type: AddCartItemBody,
  name: 'body',
  examples: {
    'Add Cart Items': {
      value: {
        mutateCartItems: [
          {
            quantity: 1,
            productId: '8514adbc-61f9-410f-ac19-73ce1274e440',
          },
          {
            quantity: 2,
            productId: '438ba551-f2f6-42dc-847a-c80aa1c2e05c',
          },
          {
            quantity: 3,
            productId: 'a2d305ee-0ae6-432d-90d2-d7866627013b',
          },
        ],
      },
    },
  },
};
