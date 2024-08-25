'use client';

import React from 'react';

import { useFilters, useFiltersQuery, useIngredients, type Prices } from '@/common/hooks';
import { types, sizes } from './data';

import { Title, RangeSlider, CheckboxFiltersGroup } from '@/components/shared';
import { Input } from '@/components/ui';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();

  const filters = useFilters();
  const filtersQuery = React.useMemo(
    () => ({
      pizzaTypes: filters.pizzaTypes,
      sizes: filters.sizes,
      prices: filters.prices,
      ingredients: filters.ingredients,
    }),
    [filters]
  );
  useFiltersQuery(filtersQuery);

  const updatePrice =
    (name: keyof Prices) => (e: React.ChangeEvent<HTMLInputElement>) => {
      filters.setPrices(name, Number(e.target.value));
    };

  const handleRangeSliderChange = ([from, to]: number[]) => {
    filters.setPrices('from', from);
    filters.setPrices('to', to);
  };

  return (
    <div className={className}>
      <Title className="mb-5 font-bold" text="Фильтрация" size="sm" />
      <CheckboxFiltersGroup
        className="mb-5"
        title="Тип теста"
        name="types"
        items={types}
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setTypes}
      />
      <CheckboxFiltersGroup
        className="mb-5"
        title="Размеры"
        name="sizes"
        items={sizes}
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
      />
      <div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            min={0}
            max={500}
            value={String(filters.prices.from)}
            placeholder="0"
            onChange={updatePrice('from')}
          />
          <Input
            type="number"
            min={100}
            max={500}
            value={String(filters.prices.to)}
            onChange={updatePrice('to')}
            placeholder="500"
          />
        </div>
        <RangeSlider
          min={0}
          max={500}
          step={10}
          value={[filters.prices.from || 0, filters.prices.to || 500]}
          onValueChange={handleRangeSliderChange}
        />
      </div>
      <CheckboxFiltersGroup
        className="mt-5"
        title="Ингредиенты"
        name="ingredients"
        items={ingredients}
        loading={loading}
        selected={filters.ingredients}
        onClickCheckbox={filters.setIngredients}
      />
    </div>
  );
};
