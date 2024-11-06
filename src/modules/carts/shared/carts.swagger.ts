import { DeliveryTypeEnum } from '@/db/enum';
import { AddCartItemBody, CheckoutBody } from '@/db/input';
import { ApiBodyOptions, ApiParamOptions } from '@nestjs/swagger';

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

export const checkoutBodyOptions: ApiBodyOptions = {
  type: CheckoutBody,
  examples: {
    'Delivery + Q1': {
      value: {
        deliveryType: DeliveryTypeEnum.delivery,
        address: '123 Bob Street',
        deliveryWardId: 'aaf69b41-12e9-4daa-ba61-946e1bd227a4',
      },
    },
  },
};
