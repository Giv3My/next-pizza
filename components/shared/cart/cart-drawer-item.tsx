import React from 'react';

import { cn } from '@/common/utils';
import type { CartItemProps, CountButtonProps } from './cart-item-details/types';

import * as CartItem from './cart-item-details';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  className?: string;
  onCountButtonClick: CountButtonProps['onClick'];
  onRemoveCartItem: VoidFunction;
}

export const CartDrawerItem: React.FC<Props> = ({
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
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CartItem.CountButton value={quantity} onClick={onCountButtonClick} />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onRemoveCartItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
