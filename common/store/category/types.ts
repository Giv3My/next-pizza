export interface CategoryState {
  currentCategoryActiveId: number;
  categoryActiveIds: number[];
  setCurrentCategory: (id: number) => void;
  addActiveCategory: (id: number) => void;
  removeCategory: (id: number) => void;
}
