import React from 'react';

import { cn } from '@/common/utils';

import { X } from 'lucide-react';

interface Props {
  className?: string;
  onClick: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <X className="h-5 w-5" />
    </button>
  );
};
