import { prisma } from '@/prisma/prisma-client';
import { isPaymentSuccess } from '@/common/services/liqpay/types/guards';
import { type Order, OrderStatus } from '@prisma/client';
import type { OrderStatusResponse } from '@/common/services/liqpay/types';

export const changeOrderStatus = async (
  order_id: string,
  orderStatusData: OrderStatusResponse
) => {
  try {
    return (await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: isPaymentSuccess(orderStatusData)
          ? OrderStatus.SUCCEEDED
          : OrderStatus.CANCELLED,
      },
    })) as Order;
  } catch (e) {
    return null;
  }
};
