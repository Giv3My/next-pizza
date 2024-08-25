'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/common/utils';
import type { ProductWithRelations } from '@/types/prisma';

import { ProductForm } from '@/components/shared';
import { Dialog, DialogContent } from '@/components/ui';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={closeModal}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <ProductForm product={product} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
