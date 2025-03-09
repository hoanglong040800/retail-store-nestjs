import { AddCartItemBody, MutateCartItem } from '@/db/input';
import { ApiParamOptions } from '@nestjs/swagger';

const exampleMutateCartItems: MutateCartItem[] = [
  {
    quantity: 1,
    productId: '2df5e900-9a5e-4eb9-b5f6-335bf60d160c',
    product: {
      name: 'Ba rọi heo',
    },
  },
  {
    quantity: 2,
    productId: '2c0ef0d9-b763-4ce5-bdc4-d9ee7a721120',
    product: {
      name: 'Cải ngọt 400g',
    },
  },
  {
    quantity: 3,
    productId: '2257dab8-58aa-4b76-8ae9-f549779cf0d4',
    product: {
      name: 'Cherry Mỹ 250g',
    },
  },
];

export const addCartItemsBodyOptions: ApiParamOptions = {
  type: AddCartItemBody,
  name: 'body',
  examples: {
    'Add Cart Items': {
      value: {
        mutateCartItems: exampleMutateCartItems,
      },
    },
  },
};
