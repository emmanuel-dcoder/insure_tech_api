import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './policy.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
