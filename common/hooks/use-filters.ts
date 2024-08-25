import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';

export interface Prices {
  from?: number;
  to?: number;
}

export interface Filters {
  pizzaTypes: Set<string>;
  sizes: Set<string>;
  prices: Prices;
  ingredients: Set<string>;
}

interface QueryFilters {
  pizzaTypes: string;
  sizes: string;
  priceFrom: Prices['from'];
  priceTo: Prices['to'];
  ingredients: string;
}

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [selectedTypes, { toggle: setTypes, clear: clearTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(','))
  );

  const [selectedSizes, { toggle: setSizes, clear: clearSizes }] = useSet(
    new Set<string>(searchParams.get('sizes')?.split(','))
  );

  const [prices, setPrices] = React.useState<Prices>({
    from: Number(searchParams.get('priceFrom')) || undefined,
    to: Number(searchParams.get('priceTo')) || undefined,
  });

  const [selectedIngredients, { toggle: setIngredients, clear: clearIngredients }] =
    useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

  React.useEffect(() => {
    if (pathname !== '/' || searchParams.size) {
      return;
    }

    clearFilters();
  }, [searchParams.size]);

  const updatePrice = (name: keyof Prices, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearPrice = () => {
    setPrices({});
  };

  const clearFilters = () => {
    clearTypes();
    clearSizes();
    clearPrice();
    clearIngredients();
  };

  const values = React.useMemo(
    () => ({
      pizzaTypes: selectedTypes,
      sizes: selectedSizes,
      prices,
      ingredients: selectedIngredients,
      setPrices: updatePrice,
      setTypes,
      setSizes,
      setIngredients,
    }),
    [selectedTypes, selectedSizes, prices, selectedIngredients]
  );

  return values;
};
