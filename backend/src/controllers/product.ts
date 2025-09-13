import { Request, Response } from 'express';
import controllerDecorator from '@/helpers/controllersDecorator';
import Product, { IProduct } from '../models/Product';

const get = async (_: Request, res: Response) => {
  const items = await Product.find({});
  res.send({ items, total: items.length });
};

const post = async (req: Request, res: Response) => {
  const { description, title, category, price } = req.body;
  const fileName = req.body.image;

  const originalName = fileName.split('/').pop();

  const newProduct = await Product.create({
    description,
    image: {
      originalName,
      fileName,
    },
    title,
    category,
    price,
  });

  res.send(newProduct);
};

const patch = async (req: Request, res: Response) => {
  const { description, title, category, price, image } = req.body;
  const { id } = req.params;

  const updatedProduct: Partial<IProduct> = {};

  if (description) updatedProduct.description = description;
  if (title) updatedProduct.title = title;
  if (category) updatedProduct.category = category;
  if (price) updatedProduct.price = price;
  if (image) updatedProduct.image = image;

  const newProduct = await Product.findByIdAndUpdate(id, updatedProduct, {
    runValidators: true,
    new: true,
  });

  res.send(newProduct);
};

const deleteRoute = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  res.send(product);
};

export const getProducts = controllerDecorator(get);
export const postProduct = controllerDecorator(post);
export const patchProduct = controllerDecorator(patch);
export const deleteProduct = controllerDecorator(deleteRoute);
