import BadRequestError from '@/errors/bad-request-error';
import product from '@/models/Product';
import isEmail from 'validator/lib/isEmail';

enum Payment {
  CARD = 'card',
  ONLINE = 'online',
}

interface Order {
  items: string[];
  total: number;
  payment: Payment;
  email: string;
  phone: string;
  address: string;
}

const validateOrder = async (order: Order) => {
  const errors: string[] = [];

  const productChecks = Promise.all(order.items.map((item) => product.findOne({ _id: item })))
    .then((orders) => {
      const isItemsHaveValue = !orders.some((item) => item?.price === null);
      const isTotalAccurate =
        order.total === orders.reduce((acc, item) => acc + (item?.price || 0), 0);
      return { isItemsHaveValue, isTotalAccurate };
    })
    .catch(() => {
      errors.push('Ошибка поиска товара');
    });

  const isEmailValid = isEmail(order.email);
  const isPhoneValid = typeof order.phone === 'string';
  const isAddressValid = typeof order.address === 'string';

  if (!isEmailValid) errors.push('Неподходящий e-mail');
  if (!isPhoneValid) errors.push('Неподходящий номер телефона');
  if (!isAddressValid) errors.push('Неподходящий адрес');

  const { isItemsHaveValue, isTotalAccurate } = (await productChecks) || {
    isItemsHaveValue: true,
    isTotalAccurate: true,
  };

  if (!isItemsHaveValue) errors.push('Товар неподходит для покупки');
  if (!isTotalAccurate) errors.push('Неверная сумма заказа');
  if (errors.length > 0) throw new BadRequestError(`Ошибка валидации заказа: ${errors.join(', ')}`);
};

export default validateOrder;
