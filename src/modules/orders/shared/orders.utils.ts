import { OrderActionEnum, OrderStatusEnum, PaymentMethodEnum } from '@/db/enum';

export const getOrderStatus = ({
  curStatus,
  action,
  paymentMethod,
}: {
  curStatus: OrderStatusEnum;
  action: OrderActionEnum;
  paymentMethod: PaymentMethodEnum;
}): OrderStatusEnum => {
  if (!curStatus || !action || !paymentMethod) {
    return curStatus;
  }

  // TODO continue
  return curStatus;
};
