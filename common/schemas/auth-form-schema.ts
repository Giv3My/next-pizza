import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(6, { message: 'Пароль должен содержать не менее 6 символов' });

export const baseSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const registerFormSchema = baseSchema
  .omit({})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const loginFormSchema = baseSchema.omit({
  fullName: true,
  confirmPassword: true,
});
