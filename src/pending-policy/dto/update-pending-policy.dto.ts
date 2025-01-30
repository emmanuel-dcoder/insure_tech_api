import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './pending-policy.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
