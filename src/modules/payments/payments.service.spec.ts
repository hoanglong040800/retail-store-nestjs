import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { StripeService } from '../stripe';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let stripeSrv: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,

        {
          provide: StripeService,
          useValue: {
            createPaymentIntent: jest.fn(),
            confirmPaymentIntent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    stripeSrv = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
