import 'dotenv/config';
import { sequelize } from './utils/db';
import './models/user.model';
import './models/user-image.model';
import { seedUsers } from './seeders/user.seeder';
import { seedUserImages } from './seeders/user-image.seeder';

async function setup() {
  try {
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedUserImages();
  } catch (e) {
    console.log('Setup error:', e);
  } finally {
    await sequelize.close();
  }
}

setup();
