import { api } from '@/common/api';
import { ApiRoutes } from './types';
import type { Product } from '@prisma/client';

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
  });

  return data;
};
