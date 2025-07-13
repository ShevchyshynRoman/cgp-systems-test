import express from 'express';
import { userController } from '../controllers/user.controller';
import { catchError } from '../middlewares/catchError';
import { upload } from '../middlewares/upload.middleware';

export const userRouter = express.Router();

userRouter.get(`/`, catchError(userController.getUsersWithImageCountPaginated));

userRouter.post('/', upload.single('image'), catchError(userController.createUserWithImageUpload));
