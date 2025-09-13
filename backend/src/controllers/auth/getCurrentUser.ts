import { AUTH_ACCESS_KEY } from '@/config';
import BadRequestError from '@/errors/bad-request-error';
import controllerDecorator from '@/helpers/controllersDecorator';
import User from '@/models/User';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const getCurrentUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new BadRequestError('Не указан access token');

  const accessToken = authHeader.replace(/^Bearer\s+/i, '');
  const { _id } = jwt.verify(accessToken, AUTH_ACCESS_KEY) as { _id: string };
  const user = await User.findById(_id);

  res.send(user);
};

export default controllerDecorator(getCurrentUser);
