import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PlanDto {
  @ApiProperty({ description: 'User ID buying the plan' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Product ID for the plan' })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: 'Quantity of products' })
  @IsNotEmpty()
  quantity: number;
}
