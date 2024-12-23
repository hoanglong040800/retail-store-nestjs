import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdersService } from './users-orders.service';

describe('UsersOrdersService', () => {
  let service: UsersOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersOrdersService],
    }).compile();

    service = module.get<UsersOrdersService>(UsersOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
