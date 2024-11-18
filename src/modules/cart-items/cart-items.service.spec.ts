import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from './cart-items.service';
import { ProductsRepo } from '../products';
import { CartItemsRepo } from './cart-items.repo';

describe('CartItemsService', () => {
  let service: CartItemsService;

  let cartItemsRepo: CartItemsRepo;
  let productRepo: ProductsRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemsService,

        {
          provide: CartItemsRepo,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },

        {
          provide: ProductsRepo,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartItemsService>(CartItemsService);
    cartItemsRepo = module.get<CartItemsRepo>(CartItemsRepo);
    productRepo = module.get<ProductsRepo>(ProductsRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
