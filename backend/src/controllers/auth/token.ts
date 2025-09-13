import { Request, Response } from 'express';
import controllerDecorator from '@/helpers/controllersDecorator';
import jwt from 'jsonwebtoken';
import { AUTH_REFRESH_KEY, AUTH_REFRESH_TOKEN_EXPIRY } from '@/config';
import ms from 'ms';
import createTokens from '@/helpers/createTokens';

const getToken = async (req: Request, res: Response) => {
  const refreshCookie = req.cookies.REFRESH_TOKEN;

  const { _id } = jwt.verify(refreshCookie, AUTH_REFRESH_KEY) as { _id: string };

  const { accessToken, refreshToken } = await createTokens(_id, refreshCookie);

  res.cookie('REFRESH_TOKEN', refreshToken, {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: ms(AUTH_REFRESH_TOKEN_EXPIRY || '7d'),
  });

  res.send({
    accessToken,
  });
};

export default controllerDecorator(getToken);
