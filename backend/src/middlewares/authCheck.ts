import { AUTH_ACCESS_KEY } from '@/config';
import NotFoundError from '@/errors/not-found-error';
import User from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import BadRequestError from '@/errors/bad-request-error';
import controllerDecorator from '../helpers/controllersDecorator';

const authCheck = (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new BadRequestError('Токен не получен');

  const token = authHeader.replace(/^Bearer\s+/i, '');
  const { _id } = jwt.verify(token, AUTH_ACCESS_KEY) as unknown as { _id: string };
  const user = User.findById(_id);
  if (!user) throw new NotFoundError('Не найден пользователь с подходящим токеном');

  next();
};

export default controllerDecorator(authCheck);
