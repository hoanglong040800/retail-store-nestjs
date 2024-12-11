import {
  OrderStatusEnum,
  PaymentActionEnum,
  PaymentMethodEnum,
} from '@/db/enum';

export const JwtTokenUnit = 'm';

type PaymentActionRules = {
  orderStatus: OrderStatusEnum[];
  paymentMethod: PaymentMethodEnum[];
};

// NOTE: need to update whenever add new payment method
export const paymentActionAllowance: Record<
  PaymentActionEnum,
  PaymentActionRules
> = {
  [PaymentActionEnum.preAuth]: {
    orderStatus: [OrderStatusEnum.pending],
    paymentMethod: [PaymentMethodEnum.creditCard],
  },

  [PaymentActionEnum.charge]: {
    orderStatus: [
      OrderStatusEnum.pending,
      OrderStatusEnum.awaitingPayment,
      OrderStatusEnum.shipped,
    ],
    paymentMethod: [PaymentMethodEnum.creditCard],
  },

  [PaymentActionEnum.chargeManual]: {
    orderStatus: [OrderStatusEnum.shipped, OrderStatusEnum.awaitingShipment],
    paymentMethod: [PaymentMethodEnum.cash],
  },
};
