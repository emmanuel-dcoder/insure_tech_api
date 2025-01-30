import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.FLOAT }) // Use INTEGER instead of NUMBER
  wallet: number;
}
