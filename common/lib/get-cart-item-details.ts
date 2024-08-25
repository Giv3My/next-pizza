import { mapPizzaType } from '@/components/shared/choose-pizza-form/data';
import type { PizzaSize, PizzaType } from '@/components/shared/choose-pizza-form/types';
import type { Ingredient } from '@prisma/client';

export const getCartItemDetails = (
  ingredients: Ingredient[],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
) => {
  const details = [];

  if (pizzaType && pizzaSize) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  details.push(...ingredients.map((ingredient) => ingredient.name));

  return details.join(', ');
};
