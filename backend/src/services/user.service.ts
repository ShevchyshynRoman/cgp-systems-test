import { sequelize } from '../utils/db';
import { faker } from '@faker-js/faker';
import { UserModel } from '../models/user.model';
import { UserImageModel } from '../models/user-image.model';
import {
  IUser,
  IUserCreate,
  IUserWithImageCount,
  IUserWithImageCountPaginated,
} from '../types/user';

function generateMockUsers(count: number): IUserCreate[] {
  return Array.from({ length: count }).map(
    (): IUserCreate => ({
      name: faker.person.firstName(),
      city: faker.location.city(),
    })
  );
}

async function getAllUserIds(): Promise<number[]> {
  const users = await UserModel.findAll({ attributes: ['id'] });
  return users.map((user) => user.id);
}

async function bulkCreateUsers(users: IUserCreate[]): Promise<void> {
  await UserModel.bulkCreate(users);
}

async function createUser(user: IUserCreate): Promise<IUser> {
  const createdUser = await UserModel.create(user);
  return createdUser.toJSON();
}

async function countUsersWithImages(): Promise<number> {
  const result = await UserModel.findAll({
    attributes: ['id'],
    include: [
      {
        model: UserImageModel,
        as: 'userImages',
        attributes: [],
      },
    ],
    group: ['UserModel.id'],
    raw: true,
  });

  return result.length;
}

async function getUsersWithImageCount(
  orderDirection: 'ASC' | 'DESC',
  limit: number,
  offset: number
): Promise<IUserWithImageCount[]> {
  const users = await UserModel.findAll({
    subQuery: false,
    attributes: {
      include: [[sequelize.fn('COUNT', sequelize.col('userImages.id')), 'imageCount']],
    },
    include: [
      {
        model: UserImageModel,
        as: 'userImages',
        attributes: [],
      },
    ],
    group: ['UserModel.id'],
    order: [[sequelize.literal(`"imageCount"`), orderDirection]],
    limit,
    offset,
    raw: true,
  }) as unknown as (IUser & { imageCount: string })[];

  return users.map((user) => ({
    ...user,
    imageCount: Number(user.imageCount),
  }));
}

async function getUsersWithImageCountPaginated(
  orderDirection: 'ASC' | 'DESC',
  limit: number,
  page: number
): Promise<IUserWithImageCountPaginated> {
  const offset = (page - 1) * limit;

  const users = await getUsersWithImageCount(orderDirection, limit, offset);
  const totalCount = await countUsersWithImages();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    users,
    totalCount,
    pageSize: limit,
    totalPages,
    page,
  };
}

export const userService = {
  generateMockUsers,
  bulkCreateUsers,
  getAllUserIds,
  getUsersWithImageCountPaginated,
  createUser
};
