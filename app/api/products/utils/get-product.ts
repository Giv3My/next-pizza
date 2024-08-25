import { prisma } from '@/prisma/prisma-client';
import type { ProductWithRelations } from '@/types/prisma';
import type { Category } from '@prisma/client';

export const getProduct = async (id: number) => {
  return prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      ingredients: true,
      items: true,
    },
  }) as Promise<ProductWithRelations | null>;
};

export const getProductWithCategory = async (id: number) => {
  return prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      category: true,
      items: true,
      ingredients: true,
    },
  }) as Promise<
    | (ProductWithRelations & {
        category: Category;
      })
    | null
  >;
};
