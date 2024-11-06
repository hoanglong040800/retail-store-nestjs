import { MutateCartItem } from '@/db/input';
import { ICartItem } from '@/db/interface';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateUpdateCartItemDto
  extends MutateCartItem
  implements ICartItem
{
  @IsUUID()
  @IsNotEmpty()
  cartId: string;

  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

}
