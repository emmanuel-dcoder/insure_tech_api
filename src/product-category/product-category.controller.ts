import { Controller, Get, Post, Param, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { successResponse } from '../config/response';

@ApiTags('Product Categories')
@Controller('categories')
export class ProductCategoryController {
  constructor(private readonly categoryService: ProductCategoryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new category',
    type: CreateProductCategoryDto,
  })
  @ApiBody({
    type: CreateProductCategoryDto,
    description: `This endpoint is for create category for products e.g "Health category" and "Auto Category"`,
  })
  async createCategory(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ) {
    const data = await this.categoryService.createCategory(
      createProductCategoryDto,
    );

    return successResponse({
      message: `User created successfully`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
  })
  async getAllCategories() {
    const data = await this.categoryService.findAllCategories();
    return successResponse({
      message:
        data.length === 0
          ? `No Product categories currently`
          : `Product categories fetched`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a category by ID',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getCategoryById(@Param('id') id: number) {
    const data = await this.categoryService.findCategoryById(id);

    return successResponse({
      message: `Product categories fetched`,
      code: HttpStatus.OK,
      status: 'success',
      data,
    });
  }
}
