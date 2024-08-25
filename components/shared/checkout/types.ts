import { z } from 'zod';
import { checkoutFormSchema } from '@/common/schemas';

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
