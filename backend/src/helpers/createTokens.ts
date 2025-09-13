import NotFoundError from '@/errors/not-found-error';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import {
  AUTH_ACCESS_KEY,
  AUTH_ACCESS_TOKEN_EXPIRY,
  AUTH_REFRESH_KEY,
  AUTH_REFRESH_TOKEN_EXPIRY,
} from '@/config';
import UnauthorizedError from '@/errors/unathorized-error';
import { Types } from 'mongoose';

const createTokens = async (_id: Types.ObjectId | string, previousToken?: string) => {
  const user = await User.findOne({ _id }).select('+tokens');

  if (!user) throw new NotFoundError('Не найден пользователь с подобный токеном');
  if (previousToken && !user.tokens.some(({ token }) => token === previousToken))
    throw new UnauthorizedError('Неподходящий токен');
  if (previousToken) user.tokens = user.tokens.filter(({ token }) => token !== previousToken);

  const accessToken = jwt.sign({ _id: user._id }, AUTH_ACCESS_KEY, {
    expiresIn: AUTH_ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({ _id: user._id }, AUTH_REFRESH_KEY, {
    expiresIn: AUTH_REFRESH_TOKEN_EXPIRY,
  });

  user.tokens.push({ token: refreshToken });
  await user.save();

  return { accessToken, refreshToken };
};

export default createTokens;
