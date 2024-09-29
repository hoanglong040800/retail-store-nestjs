import { IsBoolean, IsUUID, IsOptional } from 'class-validator';
import { IBranch } from '../interface';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindBranchesByFilterQuery implements IBranch {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  wardId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  districtId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  provinceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
