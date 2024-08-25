import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  lastName: z
    .string()
    .min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
  email: z.string().email({ message: 'Введите электронную почту' }),
  phone: z.string().regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, {
    message: 'Введите корректный номер телефона',
  }),
  address: z.string().min(5, { message: 'Введите корректный адресс' }),
  comment: z.string().optional(),
});
