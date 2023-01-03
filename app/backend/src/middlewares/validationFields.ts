import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';

const emailSchema = joi.string().email().required().messages({
  'string.email': 'Invalid email',
});

export default (req: Request, res: Response, nex: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !email.length) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const { error } = emailSchema.validate(email);
  if (error) {
    return res.status(401).json({ message: error.message });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  nex();
};
