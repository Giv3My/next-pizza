import { prisma } from '@/prisma/prisma-client';
import type { Me } from '@/types/prisma';

export const getMe = async (id: number) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      fullName: true,
      email: true,
    },
  }) as Promise<Me>;
};
