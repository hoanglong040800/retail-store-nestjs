import { DeliveryTypeEnum, PaymentMethodEnum } from '@/db/enum';
import { CheckoutBody } from '@/db/input';
import { ApiBodyOptions } from '@nestjs/swagger';

const exampleCheckoutBody: CheckoutBody = {
  deliveryType: DeliveryTypeEnum.delivery,
  address: '123 Bob Street',
  deliveryWardId: '0a890f72-4429-4697-a4f2-813fd963f3da',
  stripePaymentMethodId: 'pm_1QPDuv07tguiF49HkXctxEwl',
  paymentMethod: PaymentMethodEnum.creditCard,
};

const exampleCheckoutBody2: CheckoutBody = {
  deliveryType: DeliveryTypeEnum.delivery,
  address: '123 Bob Street',
  deliveryWardId: '0a890f72-4429-4697-a4f2-813fd963f3da',
  paymentMethod: PaymentMethodEnum.cash,
};

const exampleCheckoutBodyDifferentWard: CheckoutBody = {
  deliveryType: DeliveryTypeEnum.delivery,
  address: '456 Alice Street',
  deliveryWardId: '47e431c8-8d78-44df-8223-c44fe753ea89',
  paymentMethod: PaymentMethodEnum.cash,
};

export const checkoutBodyOptions: ApiBodyOptions = {
  type: CheckoutBody,
  examples: {
    'Delivery + Cash': {
      value: exampleCheckoutBody2,
    },

    'Delivery + Cash + Different Ward': {
      value: exampleCheckoutBodyDifferentWard,
    },

    'Delivery + Credit Card': {
      value: exampleCheckoutBody,
    },
  },
};
