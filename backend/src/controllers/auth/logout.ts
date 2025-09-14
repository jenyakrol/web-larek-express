import { AUTH_REFRESH_KEY } from '@/config';
import UnauthorizedError from '@/errors/unathorized-error';
import controllerDecorator from '@/helpers/controllersDecorator';
import User from '@/models/User';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const logout = async (req: Request, res: Response) => {
  const refreshCookie = req.cookies.REFRESH_TOKEN;

  const { _id } = jwt.verify(refreshCookie, AUTH_REFRESH_KEY) as { _id: string };

  const user = await User.findOne({ _id });

  if (!user || !user.tokens.some(({ token }) => token === refreshCookie))
    throw new UnauthorizedError('Несоответствующий токен');

  user.tokens = user.tokens.filter(({ token }) => token !== refreshCookie);

  user.save();

  res.send({ success: true });
};

export default controllerDecorator(logout);
