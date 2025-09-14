import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

const productValidationSchema = Joi.object({
  description: Joi.string(),
  image: Joi.string().required(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().allow(null),
});

const productValidation = celebrate({
  [Segments.BODY]: productValidationSchema,
});

export default productValidation;
