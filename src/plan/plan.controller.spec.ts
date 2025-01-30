import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

describe('PlanController', () => {
  let planController: PlanController;
  let planService: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanController],
      providers: [
        {
          provide: PlanService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                userId: 1,
                totalAmount: 1000,
                pendingPolicies: [{ id: 1, status: 'pending', productId: 123 }],
              },
            ]),
          },
        },
      ],
    }).compile();

    planController = module.get<PlanController>(PlanController);
    planService = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(planController).toBeDefined();
  });

  it('should return all plans', async () => {
    const result = await planController.fetchPlan();
    expect(result).toEqual({
      message: 'Plan retrieved successfully',
      status: 'success',
      data: [
        {
          id: 1,
          userId: 1,
          totalAmount: 1000,
          pendingPolicies: [{ id: 1, status: 'pending', productId: 123 }],
        },
      ],
    });
  });
});
