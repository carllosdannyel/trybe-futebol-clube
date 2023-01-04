import { Request, Response, NextFunction } from 'express';
import Exception from '../utils/httpException';
import { validateToken } from '../utils/jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { status, message } = validateToken(authorization as string) as unknown as Exception;
  if (status) return res.status(status).json({ message });
  req.body.user = message;
  next();
};
