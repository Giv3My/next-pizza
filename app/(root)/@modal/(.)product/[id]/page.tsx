import { notFound } from 'next/navigation';

import { getProduct } from '@/app/api/products/utils';

import { ChooseProductModal } from '@/components/shared/modals';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductModalPage({ params }: ProductPageProps) {
  const { id } = params;

  const product = await getProduct(Number(id));

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
