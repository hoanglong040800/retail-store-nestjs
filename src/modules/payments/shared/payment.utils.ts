import { paymentActionAllowance } from '@/constants';
import {
  OrderStatusEnum,
  PaymentActionEnum,
  PaymentMethodEnum,
} from '@/db/enum';
import { CustomException } from '@/guard';
import { HttpStatus } from '@nestjs/common';

export const checkCanProcessPayment = (
  paymentMethod: PaymentMethodEnum,
  orderStatus: OrderStatusEnum,
  action: PaymentActionEnum,
): boolean => {
  if (!paymentMethod || !orderStatus || !action) {
    throw new CustomException(
      'PARAMS_NOT_FOUND',
      HttpStatus.BAD_REQUEST,
      `paymentMethod: ${paymentMethod} or orderStatus: ${orderStatus} or action: ${action} not found`,
    );
  }

  const isValidStatus =
    paymentActionAllowance[action].orderStatus.includes(orderStatus);

  const isValidPaymentMethod =
    paymentActionAllowance[action].paymentMethod.includes(paymentMethod);

  return isValidStatus && isValidPaymentMethod;
};
