import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UsersOrdersService } from './users-orders.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard';
import { RequestType } from '../_base';
import { getUserOrdersParamsOptions } from './shared';
import { GetUserOrderDetailDto, GetUserOrdersDto } from '@/db/dto';

@Controller('users')
@ApiTags("User's Orders")
export class UsersOrdersController {
  constructor(private readonly usersOrdersService: UsersOrdersService) {}

  @Get(':userId/orders')
  @UseGuards(AuthGuard)
  @ApiParam(getUserOrdersParamsOptions)
  getOrdersByUser(
    @Param('userId') userId: string,
    @Request() req: RequestType,
  ): Promise<GetUserOrdersDto> {
    return this.usersOrdersService.getOrdersByUser(userId, req.user);
  }

  @Get('/:userId/orders/:orderId')
  @UseGuards(AuthGuard)
  @ApiParam(getUserOrdersParamsOptions)
  getOrderById(
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
    @Request() req: RequestType,
  ): Promise<GetUserOrderDetailDto> {
    return this.usersOrdersService.getOrderById({
      userId,
      orderId,
      auditUser: req.user,
    });
  }
}
