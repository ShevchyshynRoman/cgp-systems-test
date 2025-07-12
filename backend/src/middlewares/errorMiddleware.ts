import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/ApiError';

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).json({ message, errors });
    return;
  }

  console.error('Unexpected error:', error);

  res.status(500).json({
    message: 'Unexpected error',
  });
}
