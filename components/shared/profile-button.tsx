'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
  onSignIn: VoidFunction;
}

export const ProfileButton: React.FC<Props> = ({ className, onSignIn }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button variant="outline" className="flex items-center gap-1" onClick={onSignIn}>
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
