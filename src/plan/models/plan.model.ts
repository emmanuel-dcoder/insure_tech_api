import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PendingPolicy } from 'src/pending-policy/models/pending-policy.model';
import { User } from 'src/user/models/user.model';

@Table
export class Plan extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.INTEGER })
  totalAmount: number;

  @HasMany(() => PendingPolicy)
  pendingPolicies: PendingPolicy[];
}
