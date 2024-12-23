import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdersController } from './users-orders.controller';
import { UsersOrdersService } from './users-orders.service';

describe('UsersOrdersController', () => {
  let controller: UsersOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersOrdersController],
      providers: [UsersOrdersService],
    }).compile();

    controller = module.get<UsersOrdersController>(UsersOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
