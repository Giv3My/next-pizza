import { z } from 'zod';
import { passwordSchema, baseSchema } from './auth-form-schema';

export const profileFormSchema = baseSchema
  .merge(
    z.object({
      password: passwordSchema.nullable(),
      confirmPassword: passwordSchema.nullable(),
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
