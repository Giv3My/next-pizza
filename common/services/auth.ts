import { api } from '../api';
import { ApiRoutes } from './types';
import type { Me } from '@/types/prisma';

export const getMe = async () => {
  const { data } = await api.get<Me>(ApiRoutes.ME);

  return data;
};
