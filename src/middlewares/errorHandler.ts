import type {
  Request,
  Response,
  NextFunction
} from 'express';

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  console.error(error);

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });

};