import React from 'react';

import { useCartStore } from '../store';

export const useCart = () => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
