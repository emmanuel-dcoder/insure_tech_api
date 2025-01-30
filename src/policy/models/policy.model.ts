import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Unique,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';

@Table
export class Policy extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  policyNumber: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
