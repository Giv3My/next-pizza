'use client';

import React from 'react';

import { cn } from '@/common/utils';

import { Title } from './title';
import { Button } from '../ui';

interface Props {
  className?: string;
  name: string;
  imageUrl: string;
  price: number;
  loading: boolean;
  onSubmit: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  name,
  imageUrl,
  price,
  loading,
  onSubmit,
}) => {
  const handleAddToCart = () => {
    onSubmit();
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          className="relative left-2 top-2 z-10 w-[350px] h-[350px]"
          src={imageUrl}
          alt="product-image"
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title className="font-extrabold mb-1" text={name} size="md" />
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          loading={loading}
          onClick={handleAddToCart}
        >
          Добавить в корзину за {price} ₴
        </Button>
      </div>
    </div>
  );
};
