import React from 'react';
import { useSet } from 'react-use';

import { getAvailablePizzaSizes, getAvailablePizzaTypes } from '@/common/lib';
import { pizzaSizes, pizzaTypes } from '@/components/shared/choose-pizza-form/data';

import type { ProductItem } from '@prisma/client';
import type { PizzaSize, PizzaType } from '@/components/shared/choose-pizza-form/types';

export const usePizzaOptions = (items: ProductItem[]) => {
  const [size, setSize] = React.useState<PizzaSize>(pizzaSizes[0].value as PizzaSize);
  const [type, setType] = React.useState<PizzaType>(pizzaTypes[0].value as PizzaType);
  const [selectedIngredients, { toggle: setIngredients }] = useSet(new Set<number>());

  const availableSizes = getAvailablePizzaSizes(type, items);
  const availableTypes = getAvailablePizzaTypes(items);

  const currentItemId = items.find(
    (item) => item.size === size && item.pizzaType === type
  )?.id;

  React.useEffect(() => {
    const availableType = availableTypes.find((item) => !item.disabled);

    if (!availableType) {
      return;
    }

    setType(availableType.value as PizzaType);
  }, []);

  React.useEffect(() => {
    const isAvailableSize = availableSizes.find(
      (item) => item.value === size && !item.disabled
    );

    if (isAvailableSize) {
      return;
    }

    const availableSize = availableSizes.find((item) => !item.disabled);

    if (availableSize) {
      setSize(availableSize.value as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    currentItemId,
    availableSizes,
    availableTypes,
    selectedIngredients,
    setSize,
    setType,
    setIngredients,
  } as const;
};
