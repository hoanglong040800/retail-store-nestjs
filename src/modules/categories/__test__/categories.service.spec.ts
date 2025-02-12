import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../categories.service';
import { CategoriesRepo } from '../categories.repo';
import { ECategory } from '@/db/entities';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: CategoriesRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepo,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get<CategoriesRepo>(CategoriesRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByOptions', () => {
    it('should get all categories', async () => {
      jest.spyOn(repo, 'find').mockResolvedValue([]);

      const categories = await service.findAllByOptions();
      expect(categories).toBeInstanceOf(Array<ECategory>);
    });
  });

  describe('findOneByOptions', () => {
    it('should return correctly', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue({} as ECategory);

      const result = await service.findOneByOptions({ id: '1', isLeaf: true });
      expect(result).toStrictEqual({});
    });
  });
});
