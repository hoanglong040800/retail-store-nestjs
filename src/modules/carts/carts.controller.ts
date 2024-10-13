import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { RequestType } from '@/modules/_base';
import { AuthGuard } from '@/guard';
import { CartDto } from '@/db/dto';
import { addCartItemsBodyOptions, addCartItemsParamOptions } from './shared';
import { AddCartItemBody } from '@/db/input';

@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @Post(':cartId/items')
  @UseGuards(AuthGuard)
  @ApiParam(addCartItemsParamOptions)
  @ApiBody(addCartItemsBodyOptions)
  addCartItems(
    @Param('cartId') cartId: string,
    @Body() body: AddCartItemBody,
    @Request() req: RequestType,
  ): Promise<CartDto> {
    return this.service.addCartItems(cartId, body.mutateCartItems, req.user);
  }
}
