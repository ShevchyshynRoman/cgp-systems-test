import { userImageService } from '../services/user-image.service';
import { userService } from '../services/user.service';

const imagesCount = Number(process.env.SEED_IMAGES_COUNT) || 100000;

export async function seedUserImages() {
  try {
    const userIds = await userService.getAllUserIds();
    const imagesData = userImageService.generateMockUserImages(imagesCount, userIds);

    await userImageService.bulkCreateUserImages(imagesData);
  } catch (e) {
    console.log('seedUserImages error:', e);
  }
}
