import { liqPayApi } from '@/common/api';
import { calcExpireDate } from '@/common/utils';
import { getEncodedBase64Data, getUtcFormatDate, stringToSignature } from './utils';
import {
  API_URL,
  APP_URL,
  LIQPAY_API_PRIVATE_KEY,
  LIQPAY_API_PUBLIC_KEY,
} from '@/common/config';

export const getPaymentUrl = async (orderId: string, amount: number) => {
  const expiresIn = 1000 * 60 * 5;
  const expiredDate = getUtcFormatDate(calcExpireDate(expiresIn));

  const liqpayData = {
    version: 3,
    public_key: LIQPAY_API_PUBLIC_KEY,
    private_key: LIQPAY_API_PRIVATE_KEY,
    action: 'pay',
    amount: amount,
    currency: 'UAH',
    description: 'Next Pizza | Payment for the order',
    order_id: orderId,
    expired_date: expiredDate,
    result_url: `${APP_URL}/checkout/status?orderId=${orderId}`,
    server_url: `${API_URL}/checkout/callback`,
  };

  const liqpayDataEncoded = getEncodedBase64Data(liqpayData);
  const signature = stringToSignature(
    `${LIQPAY_API_PRIVATE_KEY}${liqpayDataEncoded}${LIQPAY_API_PRIVATE_KEY}`
  );

  const { request } = await liqPayApi.post(
    '3/checkout',
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

  return (request.res.responseUrl as string) || null;
};
