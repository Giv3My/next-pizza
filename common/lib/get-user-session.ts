'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/options';

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
