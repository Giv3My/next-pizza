import React from 'react';

import { cn } from '@/common/utils';
import type { CountButtonProps } from './types';

import { CountIconButton } from './count-icon-button';

export const CartItemCountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
}) => {
  const handleClick = (type: 'plus' | 'minus') => () => {
    onClick(type);
  };

  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        type="minus"
        disabled={value === 1}
        onClick={handleClick('minus')}
      />
      <b className="text-sm">{value}</b>
      <CountIconButton type="plus" onClick={handleClick('plus')} />
    </div>
  );
};
