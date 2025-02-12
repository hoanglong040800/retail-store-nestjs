import { Test, TestingModule } from '@nestjs/testing';
import { BranchesAdminDivisionsService } from '../branches-admin-division.service';
import { AdminDivisionsRepo } from '@/modules/admin-divisions';
import { BranchesRepo } from '@/modules/branches';
import { EAdminDivision, EBranch } from '@/db/entities';

describe('BranchesAdminDivisionsService', () => {
  let service: BranchesAdminDivisionsService;
  let adminDivRepo: AdminDivisionsRepo;
  let branchesRepo: BranchesRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BranchesAdminDivisionsService,
        {
          provide: AdminDivisionsRepo,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: BranchesRepo,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BranchesAdminDivisionsService>(
      BranchesAdminDivisionsService,
    );
    adminDivRepo = module.get<AdminDivisionsRepo>(AdminDivisionsRepo);
    branchesRepo = module.get<BranchesRepo>(BranchesRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAdminDivisionsByActiveBranches', () => {
    it('should return empty array when cant find active branches', async () => {
      jest.spyOn(branchesRepo, 'find').mockResolvedValueOnce([]);

      const result = await service.getAdminDivisionsByActiveBranches();

      expect(result).toEqual([]);
    });

    it('should return correct result', async () => {
      const mockActiveBranches = [
        {
          id: '1',
          isActive: true,
          wardId: '1',
          districtId: '1',
          provinceId: '1',
        },
        {
          id: '2',
          isActive: true,
          wardId: '2',
          districtId: '2',
          provinceId: '2',
        },
      ] as EBranch[];

      const mockAdDiv = [
        {
          id: '1',
          name: 'Ho Chi Minh',
          type: 'province',
          childDivisions: [
            {
              id: '11',
              name: 'Quan 1',
              type: 'district',
              childDivisions: [
                {
                  id: '111',
                  name: 'Phuong 1',
                  type: 'ward',
                },
              ],
            },
          ],
        },
      ] as EAdminDivision[];

      jest
        .spyOn(branchesRepo, 'find')
        .mockResolvedValueOnce(mockActiveBranches);

      jest.spyOn(adminDivRepo, 'find').mockResolvedValueOnce(mockAdDiv);

      const result = await service.getAdminDivisionsByActiveBranches();

      expect(result).toBe(mockAdDiv);
    });
  });
});
