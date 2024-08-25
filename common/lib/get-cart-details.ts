import { calcCartItemTotalPrice } from './calc-cart-item-total-price';
import type { CartWithRelations } from '@/types/prisma';
import type { ICartItem } from '@/common/store/cart/types';

export const getCartDetails = (data: CartWithRelations) => {
  const items = data.items.map<ICartItem>((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    size: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients,
  }));

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = data.totalAmount;

  return {
    items,
    totalQuantity,
    totalAmount,
  } as const;
};
