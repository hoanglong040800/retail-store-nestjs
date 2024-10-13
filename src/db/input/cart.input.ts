import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ICartItem } from '../interface';
import { IsNotNegative } from '@/modules/_base';
import { Type } from 'class-transformer';

export class MutateCartItem implements ICartItem {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Validate(IsNotNegative)
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  productId: string;
}

export class AddCartItemBody {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MutateCartItem)
  mutateCartItems: MutateCartItem[];
}
