import { NextRequest, NextResponse } from 'next/server';
import { render } from '@react-email/components';
import * as liqpay from '@/common/services/liqpay';
import { transporter } from '@/common/services/nodemailer';
import { changeOrderStatus } from '../utils/change-order-status';
import { CheckoutStatus } from '@/components/shared/email-templates';
import { MAIL_FROM } from '@/common/config';
import type { PaymentFailed, PaymentSuccess } from '@/common/services/liqpay/types';

export const POST = async (req: NextRequest) => {
  const dataString = (await req.text()).split('&')[1].split('=')[1];
  const data = liqpay.getDecodedBase64Data<PaymentSuccess | PaymentFailed>(dataString);

  const order = await changeOrderStatus(data.order_id, data);

  if (!order) {
    return NextResponse.json({ message: 'Order was not found' }, { status: 404 });
  }

  await transporter.sendMail({
    from: MAIL_FROM,
    to: order.email,
    subject: 'Next Pizza | Order Status',
    html: render(
      CheckoutStatus({
        orderId: order.id,
        status: order.status,
      })
    ),
  });

  return NextResponse.json(order, { status: 200 });
};
