import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/config/response';
import { PlanService } from './plan.service';
import { PlanDto } from './dto/plan.dto';

@ApiTags('Plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('buy')
  @ApiResponse({
    status: 201,
    description: 'Create a new plan',
    type: PlanDto,
  })
  async create(@Body() planDto: PlanDto) {
    const data = await this.planService.buyPlan(planDto);

    return successResponse({
      message: `Plan created successfully`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch all plans',
  })
  @ApiResponse({ status: 200, description: 'Plan retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Unable to fetch plan' })
  async fetchPlan() {
    const data = await this.planService.findAll();
    return successResponse({
      message:
        data.length !== 0
          ? `Plan retrieved successfully`
          : `No plan found currently`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
