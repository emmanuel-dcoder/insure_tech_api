import { Test, TestingModule } from '@nestjs/testing';
import { PendingPolicyController } from './pending-policy.controller';
import { PendingPolicyService } from './pending-policy.service';
import { successResponse } from 'src/config/response';
import { HttpStatus } from '@nestjs/common';

describe('PendingPolicyController', () => {
  let controller: PendingPolicyController;
  let service: PendingPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingPolicyController],
      providers: [
        {
          provide: PendingPolicyService,
          useValue: { findAll: jest.fn(), findAllByPlan: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<PendingPolicyController>(PendingPolicyController);
    service = module.get<PendingPolicyService>(PendingPolicyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all pending policies', async () => {
    const result = [{ id: 1, status: 'unused', planId: 1, productId: 1 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

    const response = await controller.getAllPendingPolicies();
    expect(response).toEqual(
      successResponse({
        message: 'Pending policy retrieved',
        code: HttpStatus.OK,
        status: 'success',
        data: result,
      }),
    );
  });

  it('should return pending policies by planId', async () => {
    const planId = 1;
    const result = [{ id: 1, status: 'unused', planId, productId: 1 }];
    jest.spyOn(service, 'findAllByPlan').mockResolvedValue(result as any);

    const response = await controller.getPendingPolicies(planId);
    expect(response).toEqual(
      successResponse({
        message: 'Pending policy retrieved',
        code: HttpStatus.OK,
        status: 'success',
        data: result,
      }),
    );
  });
});
