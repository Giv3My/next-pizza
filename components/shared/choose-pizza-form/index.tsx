'use client';

import React from 'react';

import { usePizzaOptions } from '@/common/hooks';
import { cn } from '@/common/utils';
import { calcTotalPizzaPrice } from '@/common/lib';
import { mapPizzaType } from './data';
import type { Ingredient, ProductItem } from '@prisma/client';
import type { PizzaSize, PizzaType } from './types';

import { PizzaImage, GroupVariants, IngredientItem, Title } from '@/components/shared';
import { Button } from '@/components/ui';

interface Props {
  className?: string;
  name: string;
  imageUrl: string;
  items: ProductItem[];
  ingredients: Ingredient[];
  loading: boolean;
  onSubmit: (productItemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  imageUrl,
  items,
  ingredients,
  loading,
  onSubmit,
}) => {
  const {
    size,
    type,
    currentItemId,
    availableSizes,
    availableTypes,
    selectedIngredients,
    setIngredients,
    setSize,
    setType,
  } = usePizzaOptions(items);

  const pizzaDetails = `${size} см, ${mapPizzaType[type].toLocaleLowerCase()} тесто`;

  const totalPrice = calcTotalPizzaPrice(
    size,
    type,
    items,
    ingredients,
    selectedIngredients
  );

  const handleSizeClick = (value: number) => {
    setSize(value as PizzaSize);
  };

  const handleTypeClick = (value: number) => {
    setType(value as PizzaType);
  };

  const handleIngredientClick = (value: number) => () => {
    setIngredients(value);
  };

  const handleAddToCart = () => {
    if (!currentItemId) {
      return;
    }

    onSubmit(currentItemId, Array.from(selectedIngredients));
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} className="font-extrabold mb-1" />
        <p className="text-gray-400">{pizzaDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants items={availableSizes} value={size} onClick={handleSizeClick} />
          <GroupVariants items={availableTypes} value={type} onClick={handleTypeClick} />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={handleIngredientClick(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          loading={loading}
          onClick={handleAddToCart}
        >
          {Boolean(totalPrice) && `Добавить в корзину за ${totalPrice} ₴`}
        </Button>
      </div>
    </div>
  );
};
