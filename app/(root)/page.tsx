import React from 'react';

import { getCategories, type FiltersSearchParams } from '../api/categories/utils';

import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from '@/components/shared';

interface Props {
  searchParams: FiltersSearchParams;
}

export default async function HomePage({ searchParams }: Props) {
  const categories = await getCategories(searchParams);

  const categoriesWithProducts = categories.filter((category) =>
    Boolean(category.products.length)
  );

  return (
    <>
      <Container className="mt-10">
        <Title
          className="font-extrabold"
          text={
            Boolean(categoriesWithProducts.length) ? 'Все товары' : 'Товары не найдены'
          }
          size="lg"
        />
      </Container>
      {Boolean(categoriesWithProducts.length) && (
        <TopBar categories={categoriesWithProducts} />
      )}
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <React.Suspense>
              <Filters />
            </React.Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categoriesWithProducts.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  categoryId={category.id}
                  title={category.name}
                  items={category.products}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
