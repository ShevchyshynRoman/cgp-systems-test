export interface IUser {
  id: number;
  name: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  name: string;
  city: string;
  image: File;
}

export interface IUserWithImageCount extends IUser {
  imageCount: number;
}

export interface IUserWithImageCountPaginated {
  users: IUserWithImageCount[];
  totalCount: number;
  pageSize: number;
  totalPages: number;
  page: number;
}

export interface IUserWithImageUrl extends IUser {
  image: string;
}
