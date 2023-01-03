import { Request, Response } from 'express';
import LoginService from '../services/login';
import Exception from '../utils/httpException';

export default class LoginController {
  private loginService = new LoginService();

  public async login(req: Request, res: Response) {
    const { status, message } = await this
      .loginService.login(req.body) as unknown as Exception;
    if (status) return res.status(status).json({ message });
    res.status(200).json(message);
  }

  public async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { status, message } = await this
      .loginService.loginValidate(authorization as string) as Exception;
    if (status) return res.status(status).json({ message });
    res.status(200).json(message);
  }
}
