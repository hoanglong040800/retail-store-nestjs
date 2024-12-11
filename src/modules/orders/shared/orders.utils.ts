import { NextStatusByCondition, orderStatusProgress } from '@/constants';
import { OrderStatusEnum, PaymentMethodEnum } from '@/db/enum';

export const getOrderStatus = ({
  curStatus,
  paymentMethod,
}: {
  curStatus: OrderStatusEnum;
  paymentMethod: PaymentMethodEnum;
}): OrderStatusEnum => {
  if (!curStatus || !paymentMethod) {
    return curStatus;
  }

  const nextStatusByCondition: NextStatusByCondition[] =
    orderStatusProgress[curStatus];

  const nextStatusObj: NextStatusByCondition | undefined =
    nextStatusByCondition.find(
      (statusByCondition) =>
        statusByCondition.paymentMethod === undefined ||
        statusByCondition.paymentMethod.includes(paymentMethod),
    );

  return nextStatusObj?.next || curStatus;
};
