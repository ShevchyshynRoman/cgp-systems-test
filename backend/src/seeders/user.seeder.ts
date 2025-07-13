import { userService } from '../services/user.service';

const usersCount = Number(process.env.SEED_USERS_COUNT) || 10000;

export async function seedUsers() {
  try {
     const userData = userService.generateMockUsers(usersCount);

     await userService.bulkCreateUsers(userData);
  } catch (e) {
    console.log('seedUsers error:', e);
  }
}
