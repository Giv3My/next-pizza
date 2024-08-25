'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { updateUserInfo } from '@/app/actions';
import { profileFormSchema } from '@/common/schemas';
import type { Me } from '@/types/prisma';
import type { ProfileFormValues } from './types';

import { Container } from '../container';
import { Title } from '../title';
import { FormInput } from '../form';
import { Button } from '@/components/ui';

interface Props {
  user: Me;
}

export const ProfileForm: React.FC<Props> = ({ user }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: null,
      confirmPassword: null,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateUserInfo({
        email: values.email,
        fullName: values.fullName,
        password: values.password as string,
      });

      toast.success('Данные обновлены! 📝', {
        icon: '✅',
      });

      location.reload();
    } catch (err) {
      form.reset();
      toast.error('Ошибка при обновлении данных!', {
        icon: '❌',
      });
    }
  };

  const onSignOut = () => {
    signOut({
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <Container className="my-10">
      <Title text="Личные данные" size="md" className="font-bold" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-mail" required />
          <FormInput name="fullName" label="Полное имя" required />
          <FormInput name="password" label="Новый пароль" type="password" />
          <FormInput name="confirmPassword" label="Повторите пароль" type="password" />
          <Button
            type="submit"
            className="text-base mt-10"
            disabled={form.formState.isSubmitting}
          >
            Сохранить
          </Button>
          <Button
            variant="secondary"
            className="text-base"
            disabled={form.formState.isSubmitting}
            onClick={onSignOut}
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
