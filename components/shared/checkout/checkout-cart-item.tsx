'use client';

import React from 'react';

import { cn } from '@/common/utils';
import type { CartItemProps, CountButtonProps } from '../cart/cart-item-details/types';

import * as CartItem from '../cart/cart-item-details';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  className?: string;
  onCountButtonClick: CountButtonProps['onClick'];
  onRemoveCartItem: VoidFunction;
}

export const CheckoutCartItem: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  details,
  quantity,
  disabled,
  onCountButtonClick,
  onRemoveCartItem,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>
      <CartItem.Price value={price} />
      <div className="flex items-center gap-5 ml-20">
        <CartItem.CountButton onClick={onCountButtonClick} value={quantity} />
        <Trash2Icon
          className="text-gray-400 cursor-pointer hover:text-gray-600"
          size={16}
          onClick={onRemoveCartItem}
        />
      </div>
    </div>
  );
};
