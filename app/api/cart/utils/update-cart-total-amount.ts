import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalPrice } from '@/common/lib';
import type { CartWithRelations } from '@/types/prisma';

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.items.reduce(
    (acc, item) => acc + calcCartItemTotalPrice(item),
    0
  );

  return prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  }) as Promise<CartWithRelations>;
};
