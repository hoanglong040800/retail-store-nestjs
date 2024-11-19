import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepo } from './orders.repo';
import { CartsService } from '../carts';

describe('OrdersService', () => {
  let service: OrdersService;
  // let cartsSrv: CartsService;
  // let repo: OrdersRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,

        {
          provide: OrdersRepo,
          useValue: {
            save: jest.fn(),
          },
        },

        {
          provide: CartsService,
          useValue: {
            updateCart: jest.fn(),
            getOrCreateUserCart: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    // repo = module.get<OrdersRepo>(OrdersRepo);
    // cartsSrv = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
