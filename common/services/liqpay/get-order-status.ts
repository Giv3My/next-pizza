import { liqPayApi } from '@/common/api';
import { getEncodedBase64Data, stringToSignature } from './utils';
import { LIQPAY_API_PRIVATE_KEY, LIQPAY_API_PUBLIC_KEY } from '@/common/config';
import type { OrderStatusResponse } from './types';

export const getOrderStatusData = async (orderId: string) => {
  const liqpayData = {
    action: 'status',
    version: '3',
    order_id: orderId,
    public_key: LIQPAY_API_PUBLIC_KEY,
  };

  const liqpayDataEncoded = getEncodedBase64Data(liqpayData);
  const signature = stringToSignature(
    `${LIQPAY_API_PRIVATE_KEY}${liqpayDataEncoded}${LIQPAY_API_PRIVATE_KEY}`
  );

  const { data } = await liqPayApi.post<OrderStatusResponse>(
    'request',
    {
      data: liqpayDataEncoded,
      signature,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return data;
};
