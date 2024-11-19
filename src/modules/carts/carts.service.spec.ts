import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { CartsRepo } from './carts.repo';
import { CartItemsService } from '../cart-items';
import * as cartUtil from './shared/carts.util';
import { DeliveryTypeEnum } from '@/db/enum';
import { CartCalculationDto } from '@/db/dto';
import { ECartItem } from '@/db/entities';

describe('CartsService', () => {
  let service: CartsService;

  // let repo: CartsRepo;
  // let cartItemSrv: CartItemsService;

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
    // repo = module.get<CartsRepo>(CartsRepo);
    // cartItemSrv = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateCart', () => {
    it('should return default value when cartItems empty', () => {
      const result = service.calculateCart(undefined, {
        deliveryType: DeliveryTypeEnum.delivery,
      });

      const expectedResult: CartCalculationDto = {
        subTotal: 0,
        shippingFee: 0,
        totalAmount: 0,
      };

      expect(result).toEqual(expectedResult);
    });

    it('should return correct value when cartItems has value', () => {
      const cartItems: ECartItem[] = [
        {
          id: '1',
          basePrice: 1,
          totalPrice: 1,
        },
      ];

      const expectedResult: Required<CartCalculationDto> = {
        subTotal: 10000,
        shippingFee: 10000,
        totalAmount: 20000,
      };

      jest
        .spyOn(cartUtil, 'calculateSubTotal')
        .mockReturnValueOnce(expectedResult.subTotal);
      jest
        .spyOn(cartUtil, 'calculateShippingFee')
        .mockReturnValueOnce(expectedResult.shippingFee);
      jest
        .spyOn(cartUtil, 'calculateCartTotalAmount')
        .mockReturnValueOnce(expectedResult.totalAmount);

      const result = service.calculateCart(cartItems, {
        deliveryType: DeliveryTypeEnum.delivery,
      });

      expect(result).toEqual(expectedResult);
    });
  });
});
