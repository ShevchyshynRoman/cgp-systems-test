import 'dotenv/config';
import { UserImageModel } from '../models/user-image.model';
import { IUserImageCreate } from '../types/user-image';
import { faker } from '@faker-js/faker';

function generateFakeImages(count: number, userIds: number[]): IUserImageCreate[] {
  return Array.from({ length: count }).map(() => ({
    image: faker.image.url(),
    userId: userIds[Math.floor(Math.random() * userIds.length)],
  }));
}

async function createMany(images: IUserImageCreate[]): Promise<void> {
  await UserImageModel.bulkCreate(images);
}

async function saveFile(userId: number, file: Express.Multer.File): Promise<string> {
  const filename = file.filename;

  await UserImageModel.create({
    image: filename,
    userId,
  });

  return `${process.env.BASE_URL}/uploads/${filename}`;
}

export const userImageService = {
  generateFakeImages,
  createMany,
  saveFile,
};
