import React from 'react';

import { cn } from '@/common/utils';

interface Props {
  className?: string;
  name: string;
  details: string | null;
}

export const CartItemInfo: React.FC<Props> = ({ className, name, details }) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
