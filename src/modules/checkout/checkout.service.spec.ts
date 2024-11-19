import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { CartsService } from '../carts';
import { CartItemsService } from '../cart-items';
import { BranchesService } from '../branches';
import { OrdersService } from '../orders';
import { CheckoutBody } from '@/db/input';
import { SignedTokenUser } from '../auth';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,

        {
          provide: CartsService,
          useValue: {},
        },

        {
          provide: CartItemsService,
          useValue: {},
        },

        {
          provide: BranchesService,
          useValue: {},
        },

        {
          provide: OrdersService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkout', () => {
    it('should throw error when params not found', async () => {
      await expect(
        service.checkout(
          null as unknown as CheckoutBody,
          null as unknown as SignedTokenUser,
        ),
      ).rejects.toThrow();
    });
  });
});
