import { ProductCategory } from '@product-category/models/product-category.model';
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.FLOAT })
  @Column
  price: number;

  @ForeignKey(() => ProductCategory)
  @Column
  categoryId: number;

  @BelongsTo(() => ProductCategory)
  category: ProductCategory;
}
