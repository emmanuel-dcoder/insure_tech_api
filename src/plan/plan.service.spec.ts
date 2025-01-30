import { PlanService } from './plan.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PendingPolicyService } from 'src/pending-policy/pending-policy.service';
import { UserService } from 'src/user/user.service';

describe('PlanService', () => {
  let planService: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        {
          provide: PlanService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, userId: 1, totalAmount: 1000 }),
            findAll: jest.fn().mockResolvedValue([]),
            buyPlan: jest
              .fn()
              .mockResolvedValue({ id: 1, userId: 1, totalAmount: 1000 }), // Add the mock here
          },
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: PendingPolicyService,
          useValue: {},
        },
      ],
    }).compile();

    planService = module.get<PlanService>(PlanService);
  });

  it('should be defined', () => {
    expect(planService).toBeDefined();
  });

  it('should create a plan', async () => {
    const newPlan = { userId: 1, productId: 1, quantity: 1 };
    const result = await planService.buyPlan(newPlan);
    expect(result).toEqual({ id: 1, userId: 1, totalAmount: 1000 });
  });
});
