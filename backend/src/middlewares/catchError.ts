import { Request, Response, NextFunction, RequestHandler } from 'express';

export function catchError(
  action: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
