'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { cn } from '@/common/utils';

import { Container } from './container';
import { SearchInput } from './search-input';
import { AuthModal } from './modals/auth-modal';
import { ProfileButton } from './profile-button';
import { CartButton } from './cart';

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!hasSearch && !hasCart) {
      return;
    }

    if (searchParams.has('verified')) {
      setTimeout(() => {
        router.replace('/');
        toast.success('Почта успешно подтверждена!', {
          icon: '✅',
        });
      });
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
          <ProfileButton onSignIn={handleOpenModal} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
