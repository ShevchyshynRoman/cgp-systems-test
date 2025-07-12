import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/user.model';
import { UserImageModel } from '../models/user-image.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  models: [UserModel, UserImageModel],
});

export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync();
    console.log('✅ Models synchronized');
  } catch (error) {
    console.error('❌ DB initialization error:', error);
    throw error;
  }
}
