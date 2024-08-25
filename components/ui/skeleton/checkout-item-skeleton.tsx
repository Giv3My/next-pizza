import React from 'react';
import { cn } from '@/common/utils';

import { Skeleton } from './skeleton';

function CheckoutItemSkeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Skeleton className="flex items-center gap-5">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-40 h-5 ounded" />
      </Skeleton>
      <Skeleton className="h-5 w-10 rounded" />
      <Skeleton className="h-8 w-[133px] rounded" />
    </div>
  );
}

export { CheckoutItemSkeleton };
