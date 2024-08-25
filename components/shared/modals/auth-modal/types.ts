import { z } from 'zod';
import { registerFormSchema, loginFormSchema } from '@/common/schemas';

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
