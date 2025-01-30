import { Controller, Get, Post, Body, HttpStatus, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/policy.dto';
import { ApiResponse } from '@nestjs/swagger';
import { successResponse } from 'src/config/response';
import { PolicyService } from './policy.service';

@Controller('product')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post('activate/:pendingPolicyId')
  @ApiResponse({
    status: 201,
    description: 'Activate policy',
  })
  async activatePolicy(@Param('pendingPolicyId') pendingPolicyId: string) {
    const data = await this.policyService.activatePolicy(pendingPolicyId);
    return successResponse({
      message: `Policy activated successfully`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Activate policy',
  })
  async getPolicies() {
    const data = await this.policyService.findAll();
    return successResponse({
      message:
        data.length !== 0
          ? `Policies retrieved successful`
          : `Policies not found`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
