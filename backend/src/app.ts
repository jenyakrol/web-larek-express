import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import errorsHandler from '@/middlewares/errorsHandler';
import { requestLogger, errorLogger } from '@/middlewares/logger';
import { DB_ADDRESS, ORIGIN_ALLOW, PORT, PROJECT_DIR } from '@/config';
import cookieParser from 'cookie-parser';
import router from './routes/router';

mongoose.connect(DB_ADDRESS || '');

const app = express();

app.use(
  cors({
    origin: ORIGIN_ALLOW,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200,
  }),
);
app.use(express.static(path.join(PROJECT_DIR, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log('Сервер опять запущен');
});
