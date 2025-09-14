import controllerDecorator from '@/helpers/controllersDecorator';
import User from '@/models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import ms from 'ms';
import { AUTH_REFRESH_TOKEN_EXPIRY } from '@/config';
import createTokens from '@/helpers/createTokens';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 5);

  const user = await User.create({ name, email, password: hash });
  const { accessToken, refreshToken } = await createTokens(user._id);

  res.cookie('REFRESH_TOKEN', refreshToken, {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: ms(AUTH_REFRESH_TOKEN_EXPIRY || '7d'),
  });

  res.status(201).send({
    user: {
      email: user.email,
      name: user.name,
    },
    success: true,
    accessToken,
  });
};

export default controllerDecorator(register);
