import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ICartItem } from '../interface';

export class AddCartItemBody implements ICartItem {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
