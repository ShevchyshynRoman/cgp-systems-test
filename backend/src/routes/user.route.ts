import express from 'express';
import { userController } from '../controllers/user.controller';
import { catchError } from '../middlewares/catchError';

export const userRouter = express.Router();

userRouter.get(`/`, catchError(userController.getPaginatedUsersSortedByImageCount));
