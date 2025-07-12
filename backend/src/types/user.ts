export interface IUser {
  id?: number;
  name: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserCreate = Pick<IUser, 'name' | 'city'>;

export interface IUserWithImageCount extends IUser {
  imageCount: number;
}

export interface IUserWithImageCountPaginatedResponse {
  users: IUserWithImageCount[];
  totalCount: number;
  pageSize: number;
  totalPages: number;
  page: number;
}

export interface IUserWithImageUrl extends IUser {
  image: string;
}
