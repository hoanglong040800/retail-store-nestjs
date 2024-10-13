import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
} from 'class-validator';
import { ICartItem } from '../interface';
import { IsNotNegative, customValMsg } from '@/modules/_base';

export class AddCartItemBody {
  mutateCartItems: MutateCartItem[];
}

export class MutateCartItem implements ICartItem {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Validate(IsNotNegative, { message: customValMsg.isNotNegative })
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
