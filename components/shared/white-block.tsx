import React from 'react';

import { cn } from '@/common/utils';

import { Title } from './title';

interface Props {
  className?: string;
  contentClassName?: string;
  title?: string;
  endAdornment?: React.ReactNode;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn('p-10 bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}
      <div className={cn('mt-10', contentClassName)}>{children}</div>
    </div>
  );
};
