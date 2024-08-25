import type { Ingredient } from '@prisma/client';

export interface ICartItem {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  size: number | null;
  pizzaType: number | null;
  ingredients: Ingredient[];
  disabled?: boolean;
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

export interface CartState {
  items: ICartItem[];
  totalAmount: number;
  totalQuantity: number;
  loading: boolean;
  error: boolean;
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}
