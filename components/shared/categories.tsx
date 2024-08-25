'use client';

import React from 'react';

import { useCategoryStore } from '@/common/store';
import { cn } from '@/common/utils';
import type { Category } from '@prisma/client';

interface Props {
  className?: string;
  items: Category[];
}

export const Categories: React.FC<Props> = ({ className, items }) => {
  const [categoryActiveIds, setCurrentCategory] = useCategoryStore((state) => [
    state.categoryActiveIds,
    state.setCurrentCategory,
  ]);

  const categoryActiveId = categoryActiveIds[0];

  return (
    <div className={cn('flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrentCategory(item.id)}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === item.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{item.name}</button>
        </div>
      ))}
    </div>
  );
};
