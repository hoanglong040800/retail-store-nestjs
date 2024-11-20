import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { CartsService } from '../carts';
import { CartItemsService } from '../cart-items';
import { BranchesService } from '../branches';
import { CreateOrderDto, OrdersService } from '../orders';
import { CheckoutBody, MutateCartItem } from '@/db/input';
import { SignedTokenUser } from '../auth';
import { DeliveryTypeEnum, OrderStatusEnum } from '@/db/enum';
import { mockSignedTokenUser } from '@/constants';
import { EBranch, ECart, EOrder } from '@/db/entities';
import * as cartUtils from '../carts/shared/carts.util';
import { CheckoutDto } from '@/db/dto';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let cartsSrv: CartsService;
  let branchesSrv: BranchesService;
  let ordersSrv: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,

        {
          provide: CartsService,
          useValue: {
            getUserCart: jest.fn(),
            calculateCart: jest.fn(),
          },
        },

        {
          provide: CartItemsService,
          useValue: {
            addMultiCartItems: jest.fn(),
          },
        },

        {
          provide: BranchesService,
          useValue: {
            getBranchByWardId: jest.fn(),
          },
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
    cartsSrv = module.get<CartsService>(CartsService);
    branchesSrv = module.get<BranchesService>(BranchesService);
    ordersSrv = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkout', () => {
    let spyGetUserCart: jest.SpyInstance;
    let spyConvertCartItemsToMutateCartItems: jest.SpyInstance;
    let spyGetBranchByWardId: jest.SpyInstance;
    let spyCreateOrder: jest.SpyInstance;

    const defaultMockBody: CheckoutBody = {
      deliveryType: DeliveryTypeEnum.delivery,
      deliveryWardId: 'aaf69b41-12e9-4daa-ba61-946e1bd227a4',
      address: '123 Bob Street',
    };

    const defaultMockUserCart: ECart = {
      id: 'cartId',
      cartItems: [
        {
          id: 'cartItemId1',
          basePrice: 10,
          quantity: 1,
          totalPrice: 10,
        },
      ],
    };

    const defaultMockMutateCartItems: MutateCartItem[] = [
      {
        productId: 'productId',
        quantity: 1,
      },
    ];

    const defaultDeliveryBranch: EBranch = {
      id: 'branchId',
      isActive: true,
      name: 'branchName',
      provinceId: 'provinceId',
      districtId: 'districtId',
      wardId: 'wardId',
    };

    const defaultCheckoutOrder: EOrder = {
      id: 'orderId',
      branch: defaultDeliveryBranch,
    };

    // UT: mock default value
    beforeEach(() => {
      spyGetUserCart = jest
        .spyOn(cartsSrv, 'getUserCart')
        .mockResolvedValue(defaultMockUserCart);

      spyConvertCartItemsToMutateCartItems = jest
        .spyOn(cartUtils, 'convertCartItemsToMutateCartItems')
        .mockReturnValue(defaultMockMutateCartItems);

      spyGetBranchByWardId = jest
        .spyOn(branchesSrv, 'getBranchByWardId')
        .mockResolvedValue(defaultDeliveryBranch);

      spyCreateOrder = jest
        .spyOn(ordersSrv, 'createOrder')
        .mockResolvedValue(defaultCheckoutOrder);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should throw error when params not found', async () => {
      await expect(
        service.checkout(
          null as unknown as CheckoutBody,
          null as unknown as SignedTokenUser,
        ),
      ).rejects.toThrow();
    });

    it('should return correct result when all params valid', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: mockSignedTokenUser.id,
        cartId: defaultMockUserCart.id,
        deliveryType: defaultMockBody.deliveryType,
        branchId: defaultDeliveryBranch.id,
        address: defaultMockBody.address,
        deliveryWardId: defaultMockBody.deliveryWardId,
        status: OrderStatusEnum.pending,
      };

      const expectedResult: CheckoutDto = {
        order: defaultCheckoutOrder,
        selectedBranch: defaultDeliveryBranch,
      };

      const result = await service.checkout(
        defaultMockBody,
        mockSignedTokenUser,
      );

      // UT: test passed params
      expect(spyCreateOrder).toHaveBeenCalledWith(
        createOrderDto,
        mockSignedTokenUser,
      );
      expect(spyGetUserCart).toHaveBeenCalledWith(mockSignedTokenUser.id);
      expect(spyConvertCartItemsToMutateCartItems).toHaveBeenCalledWith(
        defaultMockUserCart.cartItems,
      );
      expect(spyGetBranchByWardId).toHaveBeenCalledWith(
        defaultMockBody.deliveryWardId,
      );
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
