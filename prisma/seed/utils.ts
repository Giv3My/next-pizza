import { Prisma } from '@prisma/client';

const minPrice = 70;
const maxPrice = 200;

const sizeMultiplier = {
  20: 1,
  30: 1.5,
  40: 1.8,
};

const typeMultiplier = {
  1: 1.2,
  2: 1,
};

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getPrice = (
  pizzaType?: keyof typeof typeMultiplier,
  size?: keyof typeof sizeMultiplier,
  price?: number
) => {
  if (price) {
    return price;
  }

  return pizzaType && size
    ? Math.round(
        getRandomNumber(105, 125) * typeMultiplier[pizzaType] * sizeMultiplier[size]
      )
    : getRandomNumber(minPrice, maxPrice);
};

export const generateProductItem = ({
  productId,
  pizzaType,
  size,
  productPrice,
}: {
  productId: number;
  pizzaType?: keyof typeof typeMultiplier;
  size?: keyof typeof sizeMultiplier;
  productPrice?: number;
}) => {
  const price = getPrice(pizzaType, size, productPrice);

  return {
    productId,
    pizzaType,
    size,
    price,
  } as Prisma.ProductItemUncheckedCreateInput;
};
