import { ECartItem } from '@/db/entities';
import { ICartItem } from '@/db/interface';
import {
  calculateCartTotalAmount,
  calculateShippingFee,
  calculateSubTotal,
} from './carts.util';
import { DeliveryTypeEnum } from '@/db/enum';

describe('Cart Utils', () => {
  describe('calculateSubTotal', () => {
    type TestCartItemType = Pick<ICartItem, 'totalPrice'>;

    type TestCaseType = {
      condition: string;
      cartItems: TestCartItemType[] | null;
      expected: number;
    };

    const testCases: TestCaseType[] = [
      {
        condition: 'cartItems is null',
        cartItems: null,
        expected: 0,
      },
      {
        condition: 'cartItems is empty',
        cartItems: [],
        expected: 0,
      },
      {
        condition: 'cartItems has valid data',
        cartItems: [
          {
            totalPrice: 10000,
          },
          {
            totalPrice: 15000,
          },
          {
            totalPrice: -8000,
          },
          {
            totalPrice: undefined,
          },
        ],

        expected: 17000,
      },
    ];

    testCases.forEach(({ cartItems, expected, condition }) =>
      it(`should return ${expected} when ${condition}`, () => {
        const result = calculateSubTotal(cartItems as ECartItem[]);

        expect(result).toBe(expected);
      }),
    );
  });

  describe('calculateShippingFee', () => {
    const testCases = [
      {
        deliveryType: DeliveryTypeEnum.delivery,
        expected: 10000,
      },
      {
        deliveryType: DeliveryTypeEnum.pickup,
        expected: 0,
      },
      {
        deliveryType: null,
        expected: 0,
      },
    ];

    testCases.forEach(({ deliveryType, expected }) =>
      it(`should return ${expected} when deliveryType is ${deliveryType}`, () => {
        const result = calculateShippingFee(deliveryType as DeliveryTypeEnum);

        expect(result).toBe(expected);
      }),
    );
  });

  describe('calculateCartTotalAmount', () => {
    const testCases = [
      {
        subTotal: 0,
        shippingFee: 0,
        expected: 0,
      },
      {
        subTotal: 10000,
        shippingFee: 15000,
        expected: 25000,
      },
    ];

    testCases.forEach(({ subTotal, shippingFee, expected }) =>
      it(`should return ${expected} when subTotal is ${subTotal} and shippingFee is ${shippingFee}`, () => {
        const result = calculateCartTotalAmount({ subTotal, shippingFee });

        expect(result).toBe(expected);
      }),
    );
  });
});
