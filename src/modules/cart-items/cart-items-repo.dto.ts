import { ICartItem } from '@/db/interface';
import { IsNumber, IsUUID, Validate } from 'class-validator';
import { IsNotNegative } from '../_base';

export class CreateUpdateCartItemDto implements ICartItem {
  @IsUUID()
  cartId: string;

  @IsNumber()
  @Validate(IsNotNegative)
  quantity: number;

  @IsNumber()
  basePrice: number;

  @IsNumber()
  totalPrice: number;

  @IsUUID()
  productId: string;
}
