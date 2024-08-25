'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { registerUser } from '@/app/actions';
import { registerFormSchema } from '@/common/schemas';
import type { RegisterFormValues } from '../types';

import { FormInput } from '@/components/shared/form';
import { Button } from '@/components/ui';

interface Props {
  onClose: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        email: values.email,
        fullName: values.fullName,
        password: values.password,
      });

      toast.success('Регистрация успешна! 📝\nПодтвердите свою почту.', {
        icon: '✅',
      });

      onClose();
    } catch (error) {
      return toast.error('Аккаунт с таким email уже зарегистрирован!', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />
        <Button
          type="submit"
          className="h-12 text-base"
          loading={form.formState.isSubmitting}
        >
          Создать аккаунт
        </Button>
      </form>
    </FormProvider>
  );
};
