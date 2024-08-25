import { permanentRedirect, RedirectType } from 'next/navigation';

import { Api } from '@/common/services/api-client';

import { CheckoutStatus } from '@/components/shared/checkout';

export default async function CheckoutStatusPage({ searchParams: { orderId } }: any) {
  if (!orderId) {
    permanentRedirect('/', RedirectType.replace);
  }

  try {
    const order = await Api.checkout.getOrderStatus(orderId);

    return <CheckoutStatus order={order} />;
  } catch (e) {
    return <CheckoutStatus />;
  }
}
