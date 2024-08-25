import { create } from 'zustand';
import type { CategoryState } from './types';

export const useCategoryStore = create<CategoryState>()((set) => ({
  currentCategoryActiveId: 0,
  categoryActiveIds: [],
  setCurrentCategory: (id) => {
    set({
      currentCategoryActiveId: id,
    });
  },
  addActiveCategory: (id) => {
    set((state) => ({
      categoryActiveIds: [id, ...state.categoryActiveIds],
    }));
  },
  removeCategory: (id) => {
    set((state) => ({
      categoryActiveIds: state.categoryActiveIds.filter(
        (categoryId) => categoryId !== id
      ),
    }));
  },
}));
