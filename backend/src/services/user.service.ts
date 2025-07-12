import { sequelize } from '../utils/db';
import { faker } from '@faker-js/faker';
import { UserModel } from '../models/user.model';
import { UserImageModel } from '../models/user-image.model';
import {
  IUser,
  IUserCreate,
  IUserWithImageCount,
  IUserWithImageCountPaginatedResponse,
} from '../types/user';

function generateFakeUsers(count: number): IUserCreate[] {
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

async function createMany(users: IUserCreate[]): Promise<void> {
  await UserModel.bulkCreate(users);
}

async function countGroupedUsers(): Promise<number> {
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

async function getPaginatedUsersSortedByImageCount(
  orderDirection: 'ASC' | 'DESC',
  limit: number,
  offset: number
): Promise<IUserWithImageCountPaginatedResponse> {
  const users = await getUsersWithImageCount(orderDirection, limit, offset);

  const totalCount = await countGroupedUsers();
  const totalPages = Math.ceil(totalCount / limit);
  const page = Math.floor(offset / limit) + 1;

  return {
    users,
    totalCount,
    pageSize: limit,
    totalPages,
    page,
  };
}

export const userService = {
  generateFakeUsers,
  createMany,
  getAllUserIds,
  getPaginatedUsersSortedByImageCount,
};
