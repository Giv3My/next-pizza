import React from 'react';

import { getCartItemDetails } from '@/common/lib';
import type { ICartItem } from '@/common/store/cart/types';
import type { PizzaSize, PizzaType } from '../choose-pizza-form/types';

import { WhiteBlock } from '../white-block';
import { CheckoutCartItem } from './checkout-cart-item';
import { CheckoutItemSkeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
  items: ICartItem[];
  loading: boolean;
  handleCountButtonClick: (
    id: number,
    quantity: number
  ) => (type: 'plus' | 'minus') => void;
  handleRemoveCartItem: (id: number) => VoidFunction;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  loading,
  handleCountButtonClick,
  handleRemoveCartItem,
}) => {
  return (
    <WhiteBlock className={className} title="Корзина">
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutCartItem
                key={item.id}
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
            ))}
      </div>
    </WhiteBlock>
  );
};
