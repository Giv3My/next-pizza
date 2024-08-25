import type { CartItemWithRelations } from '@/types/prisma';

export const calcCartItemTotalPrice = (item: CartItemWithRelations) => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (item.productItem.price + ingredientsPrice) * item.quantity;
};
