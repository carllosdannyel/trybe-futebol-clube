import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import IResponse from '../interfaces/IResponse';
import { IUserWithoutPassword } from '../interfaces/ILogin';

export const generateToken = (user: IUserWithoutPassword): string =>
  jwt.sign(user, process.env.JWT_SECRET as string, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

export const validateToken = (token: string): IResponse => {
  if (!token) return { status: 401, message: 'Token must be a valid token' };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    return { status: null, message: payload };
  } catch (error) {
    return { status: 401, message: 'Token must be a valid token' };
  }
};
