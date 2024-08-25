import type { ProductItem } from '@prisma/client';
import type { CategoryWithRelations } from '@/types/prisma';
import type { FiltersSearchParams } from './get-categories';

const getMinProductItemValue = (
  items: ProductItem[],
  property: keyof Omit<ProductItem, 'pizzaType' | 'size'>
) => {
  return Math.min(...items.map((item) => Number(item[property])));
};

export const sortCategoryProducts = (
  category: CategoryWithRelations,
  sortBy: FiltersSearchParams['sort']
) => {
  category.products.sort((a, b) => {
    switch (sortBy) {
      case 'cheap':
        return (
          getMinProductItemValue(a.items, 'price') -
          getMinProductItemValue(b.items, 'price')
        );
      case 'expensive':
        return (
          getMinProductItemValue(b.items, 'price') -
          getMinProductItemValue(a.items, 'price')
        );
      case 'popular':
      default:
        return (
          getMinProductItemValue(a.items, 'createdAt') -
          getMinProductItemValue(b.items, 'createdAt')
        );
    }
  });

  return category;
};
