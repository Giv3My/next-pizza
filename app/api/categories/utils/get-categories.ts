import { sortCategoryProducts } from './sort-category-products';
import { prisma } from '@/prisma/prisma-client';
import type { CategoryWithRelations } from '@/types/prisma';

export interface FiltersSearchParams {
  pizzaTypes?: string;
  sizes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
  sort?: 'popular' | 'cheap' | 'expensive';
}

export const getCategories = async (searchParams: FiltersSearchParams) => {
  const pizzaTypes = searchParams.pizzaTypes?.split(',').map(Number);
  const sizes = searchParams.sizes?.split(',').map(Number);
  const ingredients = searchParams.ingredients?.split(',').map(Number);
  const minPrice = Number(searchParams.priceFrom) || 0;
  const maxPrice = Number(searchParams.priceTo) || 1000;
  const sort = searchParams.sort ?? 'popular';

  const categories = (await prisma.category.findMany({
    include: {
      products: {
        where: {
          items: {
            some: {
              pizzaType: { in: pizzaTypes },
              size: { in: sizes },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
          ingredients: ingredients && { some: { id: { in: ingredients } } },
        },
        include: {
          items: {
            orderBy: {
              price: 'asc',
            },
          },
          ingredients: true,
        },
      },
    },
  })) as CategoryWithRelations[];

  return categories.map((category) => sortCategoryProducts(category, sort));
};
