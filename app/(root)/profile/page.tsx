import { redirect } from 'next/navigation';

import { getSessionUser } from '@/common/lib';
import { getMe } from '@/app/api/auth/me/utils';

import { ProfileForm } from '@/components/shared';

export default async function ProfilePage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/not-auth');
  }

  const user = await getMe(Number(sessionUser.id));

  if (!user) {
    redirect('/auth/sign-out');
  }

  return <ProfileForm user={user} />;
}
