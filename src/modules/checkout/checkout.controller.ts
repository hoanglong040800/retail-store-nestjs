import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { AuthGuard } from '@/guard';
import { checkoutBodyOptions } from './shared';
import { CheckoutBody } from '@/db/input';
import { RequestType } from '../_base';
import { CheckoutDto } from '@/db/dto';

@Controller(':cartId')
@ApiTags('Checkout')
export class CheckoutController {
  constructor(private readonly checkoutSrv: CheckoutService) {}

  @Post('/checkout')
  @UseGuards(AuthGuard)
  @ApiBody(checkoutBodyOptions)
  checkout(
    @Param('cartId') cartId: string,
    @Body() body: CheckoutBody,
    @Request() req: RequestType,
  ): Promise<CheckoutDto> {
    return this.checkoutSrv.checkout(cartId, body, req.user);
  }
}
