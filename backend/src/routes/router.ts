import { Router } from 'express';
import postOrder from '@/controllers/order';
import productRouteValidator from '@/middlewares/productValidation';
import register from '@/controllers/auth/register';
import login from '@/controllers/auth/login';
import getToken from '@/controllers/auth/token';
import logout from '@/controllers/auth/logout';
import getCurrentUser from '@/controllers/auth/getCurrentUser';
import fileMiddleware from '@/middlewares/fileMiddleware';
import upload from '@/controllers/upload';
import authCheck from '@/middlewares/authCheck';
import userValidation from '@/middlewares/userValidation';
import { deleteProduct, getProducts, patchProduct, postProduct } from '../controllers/product';

const router = Router();

router.get('/product', getProducts);
router.post('/product', authCheck, productRouteValidator, postProduct);
router.patch('/product/:id', authCheck, patchProduct);
router.delete('/product/:id', authCheck, deleteProduct);

router.post('/order', postOrder);

router.post('/auth/login', login);
router.post('/auth/register', userValidation, register);
router.get('/auth/token', getToken);
router.get('/auth/logout', logout);
router.get('/auth/user', authCheck, getCurrentUser);

router.post('/upload', authCheck, fileMiddleware.single('file'), upload);

export default router;
