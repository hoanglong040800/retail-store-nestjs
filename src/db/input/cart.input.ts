import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ICartItem, IProduct } from '../interface';
import { IsNotNegative } from '@/modules/_base';
import { Type } from 'class-transformer';

export class MutateCartItemProduct implements IProduct {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MutateCartItemProduct)
  product?: MutateCartItemProduct;
}

export class AddCartItemBody {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MutateCartItem)
  mutateCartItems: MutateCartItem[];
}
