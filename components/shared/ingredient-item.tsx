import React from 'react';

import { cn } from '@/common/utils';

import { CircleCheck } from 'lucide-react';

interface Props {
  className?: string;
  name: string;
  price: number;
  imageUrl: string;
  active?: boolean;
  onClick: VoidFunction;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  name,
  price,
  imageUrl,
  active,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border border-transparent transition-all',
        { 'border-primary': active },
        className
      )}
      onClick={onClick}
    >
      <CircleCheck
        className={cn(
          'absolute top-2 right-2 text-primary opacity-0 transition-opacity',
          { 'opacity-1': active }
        )}
      />
      <img src={imageUrl} width={110} height={110} alt={name} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₴</span>
    </div>
  );
};
