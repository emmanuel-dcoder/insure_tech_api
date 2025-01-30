import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Plan } from 'src/plan/models/plan.model';
import { Product } from 'src/product/models/product.model';

@Table
export class PendingPolicy extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Plan)
  @Column
  planId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column({ defaultValue: 'unused' })
  status: 'unused' | 'used';

  @BelongsTo(() => Plan)
  plan: Plan;

  @BelongsTo(() => Product)
  product: Product;
}
