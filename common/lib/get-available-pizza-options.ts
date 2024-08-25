import { pizzaSizes, pizzaTypes } from '@/components/shared/choose-pizza-form/data';
import type { ProductItem } from '@prisma/client';
import type { Variant } from '@/components/shared/group-variants';
import type { PizzaType } from '@/components/shared/choose-pizza-form/types';

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map<Variant>((size) => ({
    name: size.name,
    value: size.value,
    disabled: !filteredPizzasByType.some((pizza) => pizza.size === size.value),
  }));
};

export const getAvailablePizzaTypes = (items: ProductItem[]) => {
  return pizzaTypes.map<Variant>((type) => ({
    name: type.name,
    value: type.value,
    disabled: !items.some((pizza) => pizza.pizzaType === type.value),
  }));
};
