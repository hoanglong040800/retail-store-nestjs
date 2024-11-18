import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { CartsRepo } from './carts.repo';
import { CartItemsService } from '../cart-items';

describe('CartsService', () => {
  let service: CartsService;

  let repo: CartsRepo;
  let cartItemSrv: CartItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,

        {
          provide: CartsRepo,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },

        {
          provide: CartItemsService,
          useValue: {
            addMultiCartItems: jest.fn(),
            getCartItemsByCartId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    repo = module.get<CartsRepo>(CartsRepo);
    cartItemSrv = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
