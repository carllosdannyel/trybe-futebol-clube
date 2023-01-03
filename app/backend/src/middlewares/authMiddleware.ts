import { Request, Response, NextFunction } from 'express';
import Exception from '../utils/httpException';
import JsonWebToken from '../utils/jwt';

const jwt = new JsonWebToken();

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { status, message } = jwt.validateToken(authorization as string) as unknown as Exception;
  if (status) return res.status(status).json({ message });
  req.body.user = message;
  next();
};
