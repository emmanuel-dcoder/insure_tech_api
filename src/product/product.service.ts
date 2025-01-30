import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const result = await this.productModel.create({
        ...createProductDto,
      });

      if (!result) throw new BadRequestException('Unable to create product ');

      return result;
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }

  async findAll() {
    try {
      return this.productModel.findAll({ include: { all: true } });
    } catch (error) {
      throw new HttpException(
        error?.response?.message ?? error?.message,
        error?.status ?? error?.statusCode ?? 500,
      );
    }
  }
}
