import { IsUUID } from 'class-validator';
import { IBranch } from '../interface';
import { IsOptional, IsString } from 'class-validator';

export class FindBranchesByFilterQuery implements IBranch {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  wardId?: string;

  @IsOptional()
  @IsUUID()
  districtId?: string;

  @IsOptional()
  @IsUUID()
  provinceId?: string;
}
