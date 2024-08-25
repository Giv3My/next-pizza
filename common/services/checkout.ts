import { api } from '../api';
import { ApiRoutes } from './types';
import type { Order } from '@prisma/client';

export const getOrderStatus = async (orderId: string) => {
  const { data } = await api.post<Order>(ApiRoutes.ORDER_STATUS, { orderId });

  return data;
};
