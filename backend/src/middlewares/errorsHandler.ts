import BadRequestError from '@/errors/bad-request-error';
import NotFoundError from '@/errors/not-found-error';
import UnauthorizedError from '@/errors/unathorized-error';
import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

type Errors = BadRequestError | NotFoundError | UnauthorizedError | Error | JsonWebTokenError;

const errorsHandler = (err: Errors, _: Request, res: Response, __: NextFunction) => {
  if (isCelebrateError(err)) return res.status(400).send(err);

  if (
    err instanceof BadRequestError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError
  )
    return res.status(err.statusCode).send({
      message: err.message,
    });

  if (err instanceof Error && err.message.includes('E11000'))
    return res.status(409).send(err.message);

  if (err instanceof JsonWebTokenError) return res.status(403).send('Неподходящий токен');

  return res.status(500).send(err.message);
};

export default errorsHandler;
