import { Product } from '@product/models/product.model';
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';

@Table
export class ProductCategory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
