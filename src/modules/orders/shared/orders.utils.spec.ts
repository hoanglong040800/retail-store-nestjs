import { OrderStatusEnum, PaymentMethodEnum } from '@/db/enum';
import { getOrderStatus } from './orders.utils';

describe('Orders Utils', () => {
  describe('getOrderStatus', () => {
    type TestCase = {
      curStatus: OrderStatusEnum;
      paymentMethod: PaymentMethodEnum;
      expected: OrderStatusEnum;
    };

    const testCases: TestCase[] = [
      {
        curStatus: OrderStatusEnum.pending,
        paymentMethod: PaymentMethodEnum.creditCard,
        expected: OrderStatusEnum.awaitingPayment,
      },

      {
        curStatus: OrderStatusEnum.pending,
        paymentMethod: PaymentMethodEnum.cash,
        expected: OrderStatusEnum.awaitingFulfillment,
      },

      {
        curStatus: OrderStatusEnum.awaitingPayment,
        paymentMethod: PaymentMethodEnum.creditCard,
        expected: OrderStatusEnum.awaitingFulfillment,
      },
      {
        curStatus: OrderStatusEnum.awaitingPayment,
        paymentMethod: PaymentMethodEnum.cash,
        expected: OrderStatusEnum.done,
      },

      {
        curStatus: OrderStatusEnum.awaitingFulfillment,
        paymentMethod: PaymentMethodEnum.creditCard,
        expected: OrderStatusEnum.awaitingShipment,
      },
      {
        curStatus: OrderStatusEnum.awaitingFulfillment,
        paymentMethod: PaymentMethodEnum.cash,
        expected: OrderStatusEnum.awaitingShipment,
      },

      {
        curStatus: OrderStatusEnum.awaitingShipment,
        paymentMethod: PaymentMethodEnum.creditCard,
        expected: OrderStatusEnum.done,
      },
      {
        curStatus: OrderStatusEnum.awaitingShipment,
        paymentMethod: PaymentMethodEnum.cash,
        expected: OrderStatusEnum.awaitingPayment,
      },
    ];

    testCases.map(({ curStatus, paymentMethod, expected }) =>
      it(`should return ${expected} when curStatus is ${curStatus} and paymentMethod is ${paymentMethod}`, () => {
        const result = getOrderStatus({
          curStatus,
          paymentMethod,
        });

        expect(result).toBe(expected);
      }),
    );

    it('should return curStatus when param is falsy', () => {
      const result = getOrderStatus({
        curStatus: undefined as any,
        paymentMethod: undefined as any,
      });

      expect(result).toBe(undefined);
    });

    it('should return curStatus when cant find next status', () => {
      const result = getOrderStatus({
        curStatus: OrderStatusEnum.pending,
        paymentMethod: 'random' as any,
      });

      expect(result).toBe(OrderStatusEnum.pending);
    });
  });
});
