import React from 'react';
import Link from 'next/link';

import type { Ingredient } from '@prisma/client';

import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface Props {
  className?: string;
  id: number;
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  price: number;
  type: 'pizza' | 'product';
}

export const ProductCard: React.FC<Props> = ({
  className,
  id,
  name,
  imageUrl,
  ingredients,
  price,
  type,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} scroll={false}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title className="mb-1 mt-3 font-bold" text={name} size="sm" />
        <p className="text-sm text-gray-400">
          {ingredients.map((ingrendient) => ingrendient.name).join(', ')}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            {type === 'pizza' ? 'от ' : ''}
            <strong>{price} ₴</strong>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
