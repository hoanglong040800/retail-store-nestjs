import { DeliveryTypeEnum, PaymentMethodEnum } from '@/db/enum';
import { CheckoutBody } from '@/db/input';
import { ApiBodyOptions } from '@nestjs/swagger';

const exampleCheckoutBody: CheckoutBody = {
  deliveryType: DeliveryTypeEnum.delivery,
  address: '123 Bob Street',
  deliveryWardId: '948d4394-b842-4359-b407-54c49b2f0443',
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
