'use client';

import React from 'react';

import { cn } from '@/common/utils';

export interface Variant {
  name: string;
  value: number;
  disabled?: boolean;
}

interface Props {
  className?: string;
  items: Variant[];
  value: Variant['value'];
  onClick: (value: Variant['value']) => void;
}

export const GroupVariants: React.FC<Props> = ({ className, items, value, onClick }) => {
  const handleVariantClick = (value: Variant['value']) => () => {
    onClick(value);
  };

  return (
    <div
      className={cn(
        'flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === value && !item.disabled,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            }
          )}
          disabled={item.disabled}
          onClick={handleVariantClick(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
