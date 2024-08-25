import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getSessionUser } from '@/common/lib';
import { Api } from '@/common/services/api-client';
import { getMe } from '@/app/api/auth/me/utils';

import { Checkout } from '@/components/shared/checkout';

export default async function CheckoutPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('cartToken')?.value;

  const cart = await Api.cart.getCart(token);

  if (!cart.items.length) {
    redirect('/');
  }

  const sessionUser = await getSessionUser();

  if (sessionUser) {
    const user = await getMe(Number(sessionUser.id));

    return <Checkout user={user} />;
  }

  return <Checkout />;
}
