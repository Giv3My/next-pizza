import { NextRequest, NextResponse } from 'next/server';
import * as liqpay from '@/common/services/liqpay';
import { changeOrderStatus } from '../utils/change-order-status';

export const POST = async (req: NextRequest) => {
  const orderId = (await req.json()).orderId;

  if (!orderId) {
    return NextResponse.json({ message: 'Invalid order id' }, { status: 400 });
  }

  const orderStatusData = await liqpay.getOrderStatusData(orderId);
  const order = await changeOrderStatus(orderId, orderStatusData);

  if (!order) {
    return NextResponse.json({ message: 'Order was not found' }, { status: 404 });
  }

  return NextResponse.json(order, { status: 200 });
};
