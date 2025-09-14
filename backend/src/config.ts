import 'dotenv/config';
import type { StringValue } from 'ms';
import path from 'path';

export const PORT: number = Number(process.env.PORT ?? 3000);
export const DB_ADDRESS: string = process.env.DB_ADDRESS ?? 'mongodb://127.0.0.1:27017/weblarek';
export const UPLOAD_PATH: string = process.env.UPPLOAD_PATH ?? 'images';
export const UPLOAD_PATH_TEMP: string = process.env.UPLOAD_PATH_TEMP ?? 'temp';
export const ORIGIN_ALLOW: string = process.env.ORIGIN_ALLOW ?? 'http://localhost:5173';

export const AUTH_REFRESH_TOKEN_EXPIRY: StringValue =
  (process.env.AUTH_REFRESH_TOKEN_EXPIRY as StringValue) ?? '7d';

export const AUTH_ACCESS_TOKEN_EXPIRY: StringValue =
  (process.env.AUTH_ACCESS_TOKEN_EXPIRY as StringValue) ?? '15m';

export const AUTH_REFRESH_KEY: string = process.env.AUTH_REFRESH_KEY ?? 'refresh';
export const AUTH_ACCESS_KEY: string = process.env.AUTH_ACCESS_KEY ?? 'access';

export const PROJECT_DIR: string = path.resolve('./');
