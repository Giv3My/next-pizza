import React from 'react';

import { cn } from '@/common/utils';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface Props {
  type: 'plus' | 'minus';
  disabled?: boolean;
  onClick: VoidFunction;
}

export const CountIconButton: React.FC<Props> = ({ disabled, type, onClick }) => {
  return (
    <Button
      className={cn(
        'p-0 w-[30px] h-[30px] rounded-[10px] hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400'
      )}
      variant="outline"
      disabled={disabled}
      onClick={onClick}
    >
      {type === 'plus' ? <Plus className="h-4" /> : <Minus className="h-4" />}
    </Button>
  );
};
