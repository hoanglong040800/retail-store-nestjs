import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdersController } from './users-orders.controller';
import { UsersOrdersService } from './users-orders.service';
import { AuthGuard } from '@/guard';

describe('UsersOrdersController', () => {
  let controller: UsersOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersOrdersController],
      providers: [
        {
          provide: UsersOrdersService,
          useValue: {
            getOrdersByUser: jest.fn(),
            getOrderById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(() => true)
      .compile();

    controller = module.get<UsersOrdersController>(UsersOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
