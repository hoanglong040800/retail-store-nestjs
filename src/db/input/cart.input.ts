import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ICartItem, IProduct } from '../interface';
import { IsNotNegative } from '@/modules/_base';
import { Type } from 'class-transformer';
import { DeliveryTypeEnum } from '../enum';
import { ApiProperty } from '@nestjs/swagger';
import { StringFieldOptional, UUIDField } from '@/decorators';

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

export class GetCartByIdQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DeliveryTypeEnum)
  deliveryType: DeliveryTypeEnum;
}

export class CheckoutBody {
  @IsEnum(DeliveryTypeEnum)
  deliveryType: DeliveryTypeEnum;

  @ValidateIf((o) => o.deliveryType === DeliveryTypeEnum.delivery)
  @IsNotEmpty()
  @IsString()
  address?: string;

  @UUIDField()
  deliveryWardId: string;

  @StringFieldOptional()
  stripePaymentMethodId?: string;
}
