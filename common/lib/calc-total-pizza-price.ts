import type { PizzaSize, PizzaType } from '@/components/shared/choose-pizza-form/types';
import type { Ingredient, ProductItem } from '@prisma/client';

export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)?.price ?? 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
