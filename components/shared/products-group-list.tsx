'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/common/store';
import { cn } from '@/common/utils';
import type { ProductWithRelations } from '@/types/prisma';

import { Title } from './title';
import { ProductCard } from './product-card';

interface Props {
  className?: string;
  title: string;
  categoryId: number;
  items: ProductWithRelations[];
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  title,
  categoryId,
  items,
  listClassName,
}) => {
  const [currentCategoryActiveId, addActiveCategory, removeCategory] = useCategoryStore(
    (state) => [
      state.currentCategoryActiveId,
      state.addActiveCategory,
      state.removeCategory,
    ]
  );

  const ref = React.useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(ref, {
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (categoryId !== currentCategoryActiveId) {
      return;
    }

    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [currentCategoryActiveId]);

  React.useEffect(() => {
    if (!intersection?.isIntersecting) {
      return removeCategory(categoryId);
    }

    addActiveCategory(categoryId);
  }, [intersection?.isIntersecting]);

  return (
    <div id={title} className={className} ref={ref}>
      <Title className="font-extrabold mb-5" text={title} size="lg" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
            type={product.items[0].pizzaType ? 'pizza' : 'product'}
          />
        ))}
      </div>
    </div>
  );
};
