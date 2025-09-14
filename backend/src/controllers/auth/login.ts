import { AUTH_REFRESH_TOKEN_EXPIRY } from '@/config';
import controllerDecorator from '@/helpers/controllersDecorator';
import User from '@/models/User';
import { Request, Response } from 'express';
import ms from 'ms';
import bcrypt from 'bcryptjs';
import UnauthorizedError from '@/errors/unathorized-error';
import createTokens from '@/helpers/createTokens';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new UnauthorizedError('Неверный пользователь или пароль');

  const { accessToken, refreshToken } = await createTokens(user._id);

  res.cookie('REFRESH_TOKEN', refreshToken, {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: ms(AUTH_REFRESH_TOKEN_EXPIRY || '7d'),
  });

  res.send({
    user: {
      email: user.email,
      name: user.name,
    },
    success: true,
    accessToken,
  });
};

export default controllerDecorator(login);
