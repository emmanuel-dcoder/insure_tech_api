import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
