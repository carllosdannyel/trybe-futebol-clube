import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import IResponse from '../interfaces/IResponse';
import { IUserWithoutPassword } from '../interfaces/ILogin';

export default class JsonWebToken {
  constructor(
    private jwtSecret = process.env.JWT_SECRET,
  ) {}

  generateToken(user: IUserWithoutPassword): string {
    return jwt.sign(user, this.jwtSecret as string, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  }

  validateToken(token: string): IResponse {
    if (!token) return { status: 401, message: 'Token not found' };

    try {
      const payload = jwt.verify(token, this.jwtSecret as string);
      return { status: null, message: payload };
    } catch (error) {
      return { status: 401, message: 'Invalid token' };
    }
  }
}
