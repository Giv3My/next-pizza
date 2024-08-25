import React from 'react';

import { Api } from '@/common/services/api-client';
import type { CheckboxItem } from '@/components/shared/filters/types';
import type { Ingredient } from '@prisma/client';

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<CheckboxItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const ingredients = await Api.ingredients.getAll();

      setIngredients(transformData(ingredients));
    } finally {
      setLoading(false);
    }
  };

  const transformData = (ingredients: Ingredient[]) => {
    return ingredients.map((item) => ({
      text: item.name,
      value: item.id,
    }));
  };

  return { ingredients, loading } as const;
};
