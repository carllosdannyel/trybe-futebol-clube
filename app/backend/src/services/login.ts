import { compareSync } from 'bcryptjs';
import IResponse from '../interfaces/IResponse';
import { IUserLogin, IUserWithoutPassword } from '../interfaces/ILogin';
import User from '../database/models/User';
import Exception from '../utils/httpException';
import { generateToken, validateToken } from '../utils/jwt';

export default class LoginService {
  private user = User;

  public async login(body: IUserLogin): Promise<IResponse> {
    const { email, password } = body;

    const user = await this.user.findOne({ where: { email } });
    if (!user) return { status: 401, message: 'Incorrect email or password' };

    const isAValidPassword = compareSync(password, user.password);
    if (!isAValidPassword) return { status: 401, message: 'Incorrect email or password' };

    const { password: _, ...userWithoutPassword } = user.dataValues;
    const token = generateToken(userWithoutPassword);

    return { status: null, message: { token } };
  }

  public async loginValidate(token: string) {
    const { status, message } = validateToken(token) as unknown as Exception;
    if (status) return { status, message };
    const { email } = message as unknown as IUserWithoutPassword;
    const user = await this.user.findOne({ where: { email } });
    if (!user) return { status: 404, message: 'user not found' };
    const { role } = user;
    return { status: null, message: { role } };
  }
}
