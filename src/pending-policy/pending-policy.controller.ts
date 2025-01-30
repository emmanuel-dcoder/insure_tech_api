import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { successResponse } from 'src/config/response';
import { PendingPolicyService } from './pending-policy.service';

@Controller('pending-policies')
export class PendingPolicyController {
  constructor(private readonly pendingPolicy: PendingPolicyService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'fetch pending policies',
  })
  async getAllPendingPolicies() {
    const data = await this.pendingPolicy.findAll();
    return successResponse({
      message:
        data.length !== 0
          ? `Pending policy retrieved`
          : `Pending policy not found`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get(':planId')
  @ApiResponse({
    status: 200,
    description: 'fetch pending policies for a planId',
  })
  async getPendingPolicies(@Param('planId') planId: number) {
    const data = await this.pendingPolicy.findAllByPlan(Number(planId));
    return successResponse({
      message:
        data.length !== 0
          ? `Pending policy retrieved`
          : `Pending policy not found`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
