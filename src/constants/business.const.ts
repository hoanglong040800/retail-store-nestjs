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
    orderStatus: [OrderStatusEnum.pending, OrderStatusEnum.awaitingPayment],
    paymentMethod: [PaymentMethodEnum.creditCard],
  },

  [PaymentActionEnum.chargeManual]: {
    orderStatus: [OrderStatusEnum.awaitingShipment],
    paymentMethod: [PaymentMethodEnum.cash],
  },
};

const onlinePayments = [PaymentMethodEnum.creditCard];
const offlinePayments = [PaymentMethodEnum.cash];

export type NextStatusByCondition = {
  paymentMethod?: PaymentMethodEnum[];
  next: OrderStatusEnum;
};

export const orderStatusProgress: Record<
  OrderStatusEnum,
  NextStatusByCondition[]
> = {
  [OrderStatusEnum.pending]: [
    {
      paymentMethod: onlinePayments,
      next: OrderStatusEnum.awaitingPayment,
    },
    {
      paymentMethod: offlinePayments,
      next: OrderStatusEnum.awaitingFulfillment,
    },
  ],

  [OrderStatusEnum.awaitingPayment]: [
    {
      paymentMethod: onlinePayments,
      next: OrderStatusEnum.awaitingFulfillment,
    },
    {
      paymentMethod: offlinePayments,
      next: OrderStatusEnum.done,
    },
  ],

  [OrderStatusEnum.awaitingFulfillment]: [
    {
      next: OrderStatusEnum.awaitingShipment,
    },
  ],

  [OrderStatusEnum.awaitingShipment]: [
    {
      paymentMethod: onlinePayments,
      next: OrderStatusEnum.done,
    },
    {
      paymentMethod: offlinePayments,
      next: OrderStatusEnum.awaitingPayment,
    },
  ],

  [OrderStatusEnum.done]: [
    {
      next: OrderStatusEnum.done,
    },
  ],

  [OrderStatusEnum.cancelled]: [
    {
      next: OrderStatusEnum.cancelled,
    },
  ],
};
