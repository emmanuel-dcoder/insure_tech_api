import { PartialType } from '@nestjs/mapped-types';
import { PlanDto } from './plan.dto';

export class UpdateProductDto extends PartialType(PlanDto) {}
