import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdersService } from './users-orders.service';
import { OrdersRepo } from '../orders';
import { CartsService } from '../carts';

describe('UsersOrdersService', () => {
  let service: UsersOrdersService;
  let ordersRepo: OrdersRepo
  let cartsSrv: CartsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersOrdersService, 
        {
          provide: OrdersRepo,
          useValue: {
            getOrdersByUser: jest.fn(),
            getOrderByUser: jest.fn(),
          },
        },


        {
          provide: CartsService,
          useValue: {
            calculateCart: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<UsersOrdersService>(UsersOrdersService);
    ordersRepo = module.get<OrdersRepo>(OrdersRepo);
    cartsSrv = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
