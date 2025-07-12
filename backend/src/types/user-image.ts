export interface IUserImage {
  id?: number;
  image: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserImageCreate = Pick<IUserImage, 'image' | 'userId'>;
