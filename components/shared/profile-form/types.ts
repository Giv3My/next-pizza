import { z } from 'zod';
import { profileFormSchema } from '@/common/schemas';

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
