import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCategory } from './models/product-category.model';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory)
    private readonly categoryModel: typeof ProductCategory,
  ) {}

  async createCategory(createProductCategoryDto: CreateProductCategoryDto) {
    try {
      const result = await this.categoryModel.create({
        name: createProductCategoryDto.name,
      });

      if (!result)
        throw new BadRequestException('Unable to create product category');

      return result;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findAllCategories() {
    try {
      return await this.categoryModel.findAll({ include: ['products'] });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findCategoryById(id: number) {
    try {
      const category = await this.categoryModel.findByPk(id, {
        include: ['products'],
      });
      if (!category) throw new NotFoundException('Category not found');
      return category;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
