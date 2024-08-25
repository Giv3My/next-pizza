'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  React.useEffect(() => {
    signOut({
      callbackUrl: '/',
      redirect: true,
    });
  }, []);

  return null;
}
