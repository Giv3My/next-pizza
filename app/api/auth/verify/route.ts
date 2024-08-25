import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  });

  if (!verificationCode) {
    return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
  }

  await prisma.user.update({
    where: {
      id: verificationCode.userId,
    },
    data: {
      verified: new Date(),
    },
  });

  await prisma.verificationCode.delete({
    where: {
      id: verificationCode.id,
    },
  });

  return NextResponse.redirect(new URL('/?verified', req.url));
};
