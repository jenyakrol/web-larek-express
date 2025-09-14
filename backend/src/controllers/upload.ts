import { PROJECT_DIR, UPLOAD_PATH } from '@/config';
import BadRequestError from '@/errors/bad-request-error';
import controllerDecorator from '@/helpers/controllersDecorator';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const upload = async (req: Request, res: Response) => {
  const { file } = req;

  if (!file) throw new BadRequestError('Не загружено изображение');

  const oldFileName = file.originalname;
  const newFileName = `${UPLOAD_PATH}/${oldFileName}`;

  await fs.rename(file.path, path.join(PROJECT_DIR, 'public', newFileName));

  res.send({ fileName: newFileName, originalName: oldFileName });
};

export default controllerDecorator(upload);
