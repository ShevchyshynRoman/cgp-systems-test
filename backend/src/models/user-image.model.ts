import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IUserImage, IUserImageCreate } from '../types/user-image';
import { UserModel } from './user.model';

@Table({
  tableName: 'user_images',
  timestamps: true,
  underscored: true,
})
export class UserImageModel extends Model<IUserImage, IUserImageCreate> implements IUserImage {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsTo(() => UserModel, 'userId')
  user?: UserModel;
}
