import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { LoginForm, RegisterForm } from './forms';
import { Button, Dialog, DialogContent } from '@/components/ui';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const handleSwitchType = () => {
    setType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleSignIn = (provider: 'github' | 'google') => () => {
    signIn(provider, {
      callbackUrl: '/',
      redirect: true,
    });
  };

  const handleClose = () => {
    setType('login');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="gap-2 h-12 p-2 flex-1"
            onClick={handleSignIn('github')}
          >
            <Image
              width={24}
              height={24}
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github"
            />
            GitHub
          </Button>
          <Button
            variant="secondary"
            onClick={handleSignIn('google')}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              width={24}
              height={24}
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google"
            />
            Google
          </Button>
        </div>
        <Button variant="outline" className="h-12" onClick={handleSwitchType}>
          {type === 'register' ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
