import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { ApiError } from '../exceptions/ApiError';
import { validateLimit, validateOrder, validatePage } from '../utils/validators';

async function getPaginatedUsersSortedByImageCount(req: Request, res: Response) {
  const order = (req.query.order as 'ASC' | 'DESC') || 'DESC';
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  const offset = (page - 1) * limit;

  const errors = {
    order: validateOrder(order),
    page: validatePage(page),
    limit: validateLimit(limit),
  };

  if (errors.order || errors.page || errors.limit) {
    throw ApiError.BadRequest('Invalid query params', errors);
  }

  const result = await userService.getPaginatedUsersSortedByImageCount(order, limit, offset);

  res.json({
    ...result,
    page,
  });
}

export const userController = {
  getPaginatedUsersSortedByImageCount,
};
