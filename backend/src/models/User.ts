import { model, Schema } from 'mongoose';

interface Token {
  token: string;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  tokens: Token[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    default: 'Ё-мое',
    minLength: [2, 'Минимальная длина поля "name" - 2'],
    maxLength: [30, 'Максимальная длина поля "name" - 30'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле "email" должно быть заполнено'],
  },
  password: {
    type: String,
    minLength: [6, 'Минимальная длина поля "password" - 6'],
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  tokens: {
    type: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    select: false,
  },
});

export default model<IUser>('user', userSchema);
