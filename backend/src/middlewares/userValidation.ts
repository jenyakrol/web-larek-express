import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userValidation = celebrate({
  [Segments.BODY]: userValidationSchema,
});

export default userValidation;
