import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Category ID for the product' })
  categoryId: number;
}
