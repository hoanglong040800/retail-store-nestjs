import { CartStatusEnum } from '@/db/enum';
import { ICart } from '@/db/interface';
import { UUIDField } from '@/decorators';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateCartDto {
  user: {
    id: string;
  };
}

export class UpdateCartDto implements ICart {
  @UUIDField()
  id: string;

  @IsOptional()
  @IsEnum(CartStatusEnum)
  status?: CartStatusEnum;
}
