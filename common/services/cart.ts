import { api } from '../api';
import { ApiRoutes } from './types';
import type { CartWithRelations } from '@/types/prisma';
import type { CreateCartItemValues } from '@/common/store/cart/types';

export const getCart = async (token?: string): Promise<CartWithRelations> => {
  const { data } = await api.get<CartWithRelations>(
    `${ApiRoutes.CART}?token=${token ?? ''}`
  );

  return data;
};

export const addCartItem = async (
  values: CreateCartItemValues
): Promise<CartWithRelations> => {
  const { data } = await api.post<CartWithRelations>(ApiRoutes.CART, values);

  return data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartWithRelations> => {
  const { data } = await api.patch<CartWithRelations>(`${ApiRoutes.CART}/${itemId}`, {
    quantity,
  });

  return data;
};

export const removeCartItem = async (itemId: number): Promise<CartWithRelations> => {
  const { data } = await api.delete<CartWithRelations>(`${ApiRoutes.CART}/${itemId}`);

  return data;
};
