import { DeliveryTypeEnum, PaymentMethodEnum } from '@/db/enum';
import { CheckoutBody } from '@/db/input';
import { ApiBodyOptions } from '@nestjs/swagger';

const exampleCheckoutBody: CheckoutBody = {
  deliveryType: DeliveryTypeEnum.delivery,
  address: '123 Bob Street',
  deliveryWardId: 'aaf69b41-12e9-4daa-ba61-946e1bd227a4',
  stripePaymentMethodId: 'pm_1QPDuv07tguiF49HkXctxEwl',
  paymentMethod: PaymentMethodEnum.creditCard,
};

export const checkoutBodyOptions: ApiBodyOptions = {
  type: CheckoutBody,
  examples: {
    'Delivery + Q1': {
      value: exampleCheckoutBody,
    },
  },
};
