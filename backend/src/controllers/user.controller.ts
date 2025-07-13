import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { ApiError } from '../exceptions/ApiError';
import {
  validateCity,
  validateImageFile,
  validateLimit,
  validateName,
  validateOrder,
  validatePage,
} from '../utils/validators';
import { userImageService } from '../services/user-image.service';
import { IUserWithImageUrl } from '../types/user';

async function getUsersWithImageCountPaginated(req: Request, res: Response) {
  const order = (req.query.order as 'ASC' | 'DESC') || 'DESC';
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  const errors = {
    order: validateOrder(order),
    page: validatePage(page),
    limit: validateLimit(limit),
  };

  if (errors.order || errors.page || errors.limit) {
    throw ApiError.BadRequest('Invalid query params', errors);
  }

  const result = await userService.getUsersWithImageCountPaginated(order, limit, page);

  res.status(200).json(result);
}

async function createUserWithImageUpload(req: Request, res: Response) {
  const { name, city } = req.body;
  const file = req.file;

  const errors = {
    name: validateName(name),
    city: validateCity(city),
    file: validateImageFile(file),
  };

  if (errors.name || errors.city || errors.file) {
    throw ApiError.BadRequest('Invalid body params', errors);
  }

  const user = await userService.createUser({ name, city });

  const imageUrl = await userImageService.saveUserImageFile(user.id, file!);

  const userWithImageUrl: IUserWithImageUrl = {
    ...user,
    image: imageUrl,
  };

  res.status(201).json(userWithImageUrl);
}

export const userController = {
  getUsersWithImageCountPaginated,
  createUserWithImageUpload,
};
