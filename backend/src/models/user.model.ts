import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import { IUser, IUserCreate } from '../types/user';
import { UserImageModel } from './user-image.model';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class UserModel extends Model<IUser, IUserCreate> implements IUser {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  city!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @HasMany(() => UserImageModel, 'userId')
  userImages?: UserImageModel[];
}
