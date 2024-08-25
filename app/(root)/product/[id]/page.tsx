import { notFound } from 'next/navigation';

import { getProductWithCategory } from '@/app/api/products/utils';

import { Container, ProductForm } from '@/components/shared';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  const product = await getProductWithCategory(Number(id));

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
