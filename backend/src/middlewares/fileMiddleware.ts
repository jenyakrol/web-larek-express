import multer from 'multer';
import { PROJECT_DIR, UPLOAD_PATH_TEMP } from '@/config';
import path from 'path';
import { Request } from 'express';

const fileFilter: multer.Options['fileFilter'] = (_: Request, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname));

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Не является картинкой'));
  }
};

const fileMiddleware = multer({
  dest: path.join(PROJECT_DIR, UPLOAD_PATH_TEMP),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

export default fileMiddleware;
