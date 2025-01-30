import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successResponse } from '../config/response';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new product',
    type: CreateProductDto,
  })
  @ApiBody({
    type: CreateProductDto,
    description:
      'This is for creating product. Name, price and categoryId are required',
  })
  async create(@Body() CreateProductDto: CreateProductDto) {
    const data = await this.productService.create(CreateProductDto);

    return successResponse({
      message: `Product created successfully`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get('fetch')
  @ApiResponse({
    status: 201,
    description: 'Get a new product',
  })
  async getAllProducts() {
    const data = await this.productService.findAll();
    return successResponse({
      message: data.length
        ? `Product retrieve successfully`
        : `Product not found`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
