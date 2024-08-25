import { api } from '@/common/api';
import { ApiRoutes } from './types';
import type { Ingredient } from '@prisma/client';

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await api.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
