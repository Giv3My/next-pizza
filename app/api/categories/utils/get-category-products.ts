import { prisma } from '@/prisma/prisma-client';
import type { Category } from '@prisma/client';
import type { ProductWithRelations } from '@/types/prisma';

export const getCategoryProducts = async (id: number) => {
  return prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          items: true,
        },
      },
    },
  }) as Promise<
    | (Category & {
        products: Omit<ProductWithRelations, 'ingredients'>[];
      })
    | null
  >;
};
