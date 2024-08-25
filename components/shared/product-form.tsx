'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { useCartStore } from '@/common/store';
import type { ProductWithRelations } from '@/types/prisma';

import { ChoosePizzaForm, ChooseProductForm } from '.';

interface Props {
  product: ProductWithRelations;
  closeModal?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, closeModal }) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.size && firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productItemId: productItemId ?? firstItem.id,
        ingredients,
      });

      toast.success(`Товар ${product.name} добавлен в корзину`, {
        icon: '✅',
      });
      closeModal?.();
    } catch {
      toast.error('Не удалось добавить товар в корзину', {
        icon: '❌',
      });
    }
  };

  return isPizzaForm ? (
    <ChoosePizzaForm
      name={product.name}
      imageUrl={product.imageUrl}
      items={product.items}
      ingredients={product.ingredients}
      loading={loading}
      onSubmit={onSubmit}
    />
  ) : (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      price={firstItem.price}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};
