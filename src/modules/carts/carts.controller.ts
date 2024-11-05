import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { RequestType } from '@/modules/_base';
import { AuthGuard } from '@/guard';
import { CartDto, CheckoutDto } from '@/db/dto';
import { addCartItemsBodyOptions, addCartItemsParamOptions, checkoutBodyOptions } from './shared';
import { AddCartItemBody, CheckoutBody, GetCartByIdQuery } from '@/db/input';

@Controller('carts')
@ApiTags('Carts')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @Get(':cartId')
  @UseGuards(AuthGuard)
  getCartById(
    @Param('cartId') cartId: string,
    @Query() query: GetCartByIdQuery,
    @Request() req: RequestType,
  ): Promise<CartDto> {
    return this.service.getCartById(
      cartId,
      { deliveryType: query.deliveryType },
      req.user,
    );
  }

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

  @Post(':cartId/checkout')
  @UseGuards(AuthGuard)
  @ApiBody(checkoutBodyOptions)
  checkout(
    @Param('cartId') cartId: string,
    @Body() body: CheckoutBody,
    @Request() req: RequestType,
  ): Promise<CheckoutDto> {
    return this.service.checkout(cartId, body, req.user);
  }
}
