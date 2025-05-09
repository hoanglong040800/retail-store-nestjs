import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSearchQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  searchText: string;
}
