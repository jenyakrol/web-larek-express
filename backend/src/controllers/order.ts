import controllerDecorator from '@/helpers/controllersDecorator';
import validateOrder from '@/helpers/orderValidation';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

const postOrder = async (req: Request, res: Response) => {
  const order = req.body;
  await validateOrder(order);
  res.status(201).send({
    id: randomUUID(),
    total: order.total,
  });
};

export default controllerDecorator(postOrder);
