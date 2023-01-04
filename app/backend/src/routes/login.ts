import { Router } from 'express';
import LoginController from '../controllers/login';
import validationFields from '../middlewares/validationFields';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', validationFields, (req, res) => loginController.login(req, res));
loginRouter.get('/validate', (req, res) => loginController.loginValidate(req, res));

export default loginRouter;
