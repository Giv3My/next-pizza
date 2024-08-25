'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { createOrder } from '@/app/actions';
import { useCart } from '@/common/hooks';
import { cn } from '@/common/utils';
import { checkoutFormSchema } from '@/common/schemas';
import type { Me } from '@/types/prisma';
import type { CheckoutFormValues } from '@/components/shared/checkout/types';

import { Container, Title } from '@/components/shared';
import { CheckoutCart, CheckoutSidebar } from '@/components/shared/checkout';
import {
  CheckoutPersonalForm,
  CheckoutDeliveryForm,
} from '@/components/shared/checkout/forms';

interface Props {
  user?: Me;
}

export const Checkout: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onBlur',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { items, loading, totalAmount, updateItemQuantity, removeCartItem } = useCart();

  const isPageLoading = loading && !Boolean(items.length);

  React.useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', user.email);
    }
  }, []);

  React.useEffect(() => {
    if (!loading && !items.length) {
      router.replace('/');
    }
  }, [items]);

  const handleCountButtonClick =
    (id: number, quantity: number) => (type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? ++quantity : --quantity;
      updateItemQuantity(id, newQuantity);
    };

  const handleRemoveCartItem = (id: number) => () => {
    removeCartItem(id);
  };

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (values) => {
    try {
      setIsSubmitting(true);

      const paymentUrl = await createOrder(values);

      toast.success('Заказ успешно оформлен! 📝', {
        icon: '✅',
      });

      location.href = paymentUrl;
    } catch {
      setIsSubmitting(false);
      toast.error('Не удалось создать заказ!', {
        icon: '❌',
      });
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-1 flex-col gap-10 mb-20">
              <CheckoutCart
                items={items}
                loading={isPageLoading}
                handleCountButtonClick={handleCountButtonClick}
                handleRemoveCartItem={handleRemoveCartItem}
              />
              <CheckoutPersonalForm
                className={cn({ 'opacity-40 pointer-events-none': isPageLoading })}
              />
              <CheckoutDeliveryForm
                className={cn({ 'opacity-40 pointer-events-none': isPageLoading })}
              />
            </div>
            <div className="w-[450px]">
              {Boolean(items.length) && (
                <CheckoutSidebar
                  loading={loading}
                  isSubmitting={isSubmitting}
                  totalAmount={totalAmount}
                />
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};
