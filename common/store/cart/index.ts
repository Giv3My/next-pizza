import { create } from 'zustand';
import { Api } from '@/common/services/api-client';
import { getCartDetails } from '@/common/lib';
import type { CartState, ICartItem, CreateCartItemValues } from './types';

const disableItem = (items: ICartItem[], id: number) => {
  return items.map((item) => (item.id === id ? { ...item, disabled: true } : item));
};

const resetItems = (items: ICartItem[]) => {
  return items.map((item) => ({ ...item, disabled: false }));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,
  totalQuantity: 0,
  fetchCartItems: async () => {
    try {
      set({ items: [], loading: true, error: false });

      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });

      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: disableItem(state.items, id),
      }));

      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: resetItems(state.items),
      }));
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: disableItem(state.items, id),
      }));

      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: resetItems(state.items),
      }));
    }
  },
}));
