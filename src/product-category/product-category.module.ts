import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from './models/product-category.model';
import { Product } from 'src/product/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductCategory, Product])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
