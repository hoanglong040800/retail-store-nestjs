import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { ECategory } from '@/db/entities';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let cateSrv: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            findAllByOptions: jest.fn(),
            findOneByOptions: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    cateSrv = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', async () => {
    const expectedResult: ECategory[] = [];

    jest
      .spyOn(cateSrv, 'findAllByOptions')
      .mockResolvedValueOnce(expectedResult);

    const result = await controller.findAll();

    expect(result).toBe(expectedResult);
  });

  it('findOne', async () => {
    const expectedResult = {
      id: '1',
    } as ECategory;

    jest
      .spyOn(cateSrv, 'findOneByOptions')
      .mockResolvedValueOnce(expectedResult);

    const result = await controller.findOne('1');

    expect(result).toBe(expectedResult);
  });
});
