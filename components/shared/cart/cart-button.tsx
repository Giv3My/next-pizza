'use client';

import React from 'react';

import { useCartStore } from '@/common/store';
import { cn } from '@/common/utils';

import { CartDrawer } from './cart-drawer';
import { Button } from '@/components/ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalQuantity, totalAmount, loading] = useCartStore((state) => [
    state.totalQuantity,
    state.totalAmount,
    state.loading,
  ]);

  return (
    <CartDrawer>
      <Button className={cn('group relative min-w-[105px]', className)} loading={loading}>
        <strong>{totalAmount} ₴</strong>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <strong>{totalQuantity}</strong>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
