'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'react-use';
import qs from 'qs';

import type { Filters } from './use-filters';

export const useFiltersQuery = (filters: Filters) => {
  const router = useRouter();

  const isFirstMount = React.useRef(true);
  const searchParams = useSearchParams();

  useDebounce(
    () => {
      if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
      }

      const queryParams = {
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        priceFrom: filters.prices.from,
        priceTo: filters.prices.to,
        ingredients: Array.from(filters.ingredients),
        sort: searchParams.get('sort'),
      };

      const query = qs.stringify(queryParams, {
        arrayFormat: 'comma',
        skipNulls: true,
      });

      router.push(`?${query}`, { scroll: false });
    },
    250,
    [filters]
  );
};
