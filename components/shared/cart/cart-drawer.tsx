'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from '@/common/hooks';
import { getCartItemDetails } from '@/common/lib';
import type { PizzaSize, PizzaType } from '../choose-pizza-form/types';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartDrawerItem } from './cart-drawer-item';
import { Title } from '../title';
import { Button } from '@/components/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { items, totalQuantity, totalAmount, updateItemQuantity, removeCartItem } =
    useCart();

  const handleCountButtonClick =
    (id: number, quantity: number) => (type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? ++quantity : --quantity;
      updateItemQuantity(id, newQuantity);
    };

  const handleRemoveCartItem = (id: number) => () => {
    removeCartItem(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        {Boolean(items.length) ? (
          <>
            <SheetHeader>
              <SheetTitle>
                В корзине <span className="font-bold">{totalQuantity} товара</span>
              </SheetTitle>
            </SheetHeader>
            <div className="-mx-5 mt-5 flex-1 overflow-auto scrollbar">
              {items.map((item) => (
                <div key={item.id} className="mb-2">
                  <CartDrawerItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.size as PizzaSize
                    )}
                    disabled={item.disabled}
                    onCountButtonClick={handleCountButtonClick(item.id, item.quantity)}
                    onRemoveCartItem={handleRemoveCartItem(item.id)}
                  />
                </div>
              ))}
            </div>
            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>
                  <span className="font-bold text-lg">{totalAmount} ₴</span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full h-12 text-base">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full items-center">
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                width={120}
                height={120}
                alt="empty-box"
              />
              <Title
                text="Корзина пустая"
                size="sm"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы один товар, чтобы оформить заказ
              </p>
              <SheetClose>
                <Button size="lg" className="w-56 h-12 text-base">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
