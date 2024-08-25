'use client';

import React from 'react';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { loginFormSchema } from '@/common/schemas';
import type { LoginFormValues } from '../types';

import { Title } from '@/components/shared';
import { FormInput } from '@/components/shared/form';
import { Button } from '@/components/ui';

interface Props {
  onClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
      });

      if (!response?.ok) {
        throw Error;
      }

      toast.success('Вход в аккаунт выполнен успешно!', {
        icon: '✅',
      });

      onClose();
    } catch {
      toast.error('Неверный E-mail или пароль!', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <Image
            src="/assets/images/phone-icon.png"
            width={60}
            height={60}
            alt="phone-icon"
          />
        </div>
        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <Button
          className="h-12 text-base"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
