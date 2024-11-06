import { CartCalculationDto } from '@/db/dto';
import { ECartItem } from '@/db/entities';
import { DeliveryTypeEnum } from '@/db/enum';

export const calculateSubTotal = (cartItems: ECartItem[]): number => {
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
