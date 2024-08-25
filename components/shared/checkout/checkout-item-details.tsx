import React from 'react';

import { cn } from '@/common/utils';

interface Props {
  className?: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  value: React.ReactNode;
}

export const CheckoutItemDetails: React.FC<Props> = ({
  className,
  title,
  icon,
  value,
}) => {
  return (
    <div className={cn('flex my-4', className)}>
      <span className="flex flex-1 tetx-lg text-neutral-500">
        <div className="flex items-center">
          {Boolean(icon) && icon}
          {title}
        </div>
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};
