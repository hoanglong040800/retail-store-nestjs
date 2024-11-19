import { ECartItem } from '@/db/entities';
import { ICartItem } from '@/db/interface';
import { calculateSubTotal } from './carts.util';

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

  
});
