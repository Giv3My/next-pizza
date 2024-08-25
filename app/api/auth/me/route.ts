import { NextResponse } from 'next/server';
import { getSessionUser } from '@/common/lib';
import { getMe } from './utils';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized user' }, { status: 401 });
  }

  const data = await getMe(Number(user.id));

  return NextResponse.json(data, { status: 200 });
};
