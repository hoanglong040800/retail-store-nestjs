import { AddCartItemBody } from '@/db/input';
import { ICartItem } from '@/db/interface';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUpdateCartItemDto
  extends AddCartItemBody
  implements ICartItem
{
  @IsUUID()
  @IsNotEmpty()
  cartId: string;
}
