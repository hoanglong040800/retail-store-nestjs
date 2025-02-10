import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from '@/db/dto';
import { mockRequest } from '@/constants';
import { DeliveryTypeEnum, PaymentMethodEnum } from '@/db/enum';
import { AuthGuard } from '@/guard';
import { CheckoutBody } from '@/db/input';

describe('CheckoutController', () => {
  let controller: CheckoutController;
  let checkoutSrv: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        {
          provide: CheckoutService,
          useValue: {
            checkout: jest.fn(),
          },
        },
      ],
    })
      // UT: mock AuthGuard
      .overrideGuard(AuthGuard)
      .useValue(() => true)
      .compile();

    controller = module.get<CheckoutController>(CheckoutController);
    checkoutSrv = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkout', () => {
    it('should return correct value', async () => {
      const expectedResult: CheckoutDto = {
        order: {
          id: 'order1',
        },
        selectedBranch: {
          id: 'selectedBranch1',
        },
      };

      const body: CheckoutBody = {
        deliveryType: DeliveryTypeEnum.delivery,
        address: 'address',
        deliveryWardId: 'deliveryWardId',
        paymentMethod: PaymentMethodEnum.cash,
      };

      jest.spyOn(checkoutSrv, 'checkout').mockResolvedValueOnce(expectedResult);

      const result = await controller.checkout(body, mockRequest);

      expect(result).toEqual(expectedResult);
    });
  });
});
