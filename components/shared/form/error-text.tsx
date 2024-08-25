import React from 'react';

import { cn } from '@/common/utils';

interface Props {
  className?: string;
  text: string;
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
  return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};
