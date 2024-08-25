import { prisma } from '@/prisma/prisma-client';

export const clearCart = async (id: number) => {
  await prisma.cart.update({
    where: {
      id,
    },
    data: {
      totalAmount: 0,
    },
  });

  await prisma.cartItem.deleteMany({
    where: {
      cartId: id,
    },
  });
};
