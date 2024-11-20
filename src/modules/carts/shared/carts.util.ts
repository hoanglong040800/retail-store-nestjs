import { CartCalculationDto } from '@/db/dto';
import { ECartItem } from '@/db/entities';
import { DeliveryTypeEnum } from '@/db/enum';
import { MutateCartItem } from '@/db/input';

export const calculateSubTotal = (cartItems: ECartItem[]): number => {
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }

  const subTotal: number = cartItems.reduce((prev, cartItem) => {
    if (isNaN(cartItem.totalPrice)) {
      return prev;
    }

    return prev + cartItem.totalPrice;
  }, 0);

  return subTotal;
};

export const calculateShippingFee = (
  deliveryType: DeliveryTypeEnum,
): number => {
  switch (deliveryType) {
    case DeliveryTypeEnum.delivery:
      return 10000;

    case DeliveryTypeEnum.pickup:
      return 0;

    default:
      return 0;
  }
};

export const calculateCartTotalAmount = ({
  subTotal,
  shippingFee,
}: Pick<Required<CartCalculationDto>, 'subTotal' | 'shippingFee'>) => {
  return subTotal + shippingFee;
};

export const convertCartItemsToMutateCartItems = (
  cartItems: ECartItem[] | undefined,
): MutateCartItem[] => {
  if (!cartItems) {
    return [];
  }

  const mutateCartItems: MutateCartItem[] = cartItems.reduce(
    (prev: MutateCartItem[], cur) => {
      if (!cur.productId || !cur.quantity) {
        return prev;
      }

      const mutateCartItem: MutateCartItem = {
        id: cur.id,
        productId: cur.productId,
        quantity: cur.quantity,
      };

      return [...prev, mutateCartItem];
    },

    [],
  );

  return mutateCartItems;
};
