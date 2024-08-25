import { prisma } from '../prisma-client';
import { generateProductItem } from './utils';
import { categories, ingredients, products, pizzas } from '../data';

const up = async () => {
  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: pizzas[0],
  });

  const pizza2 = await prisma.product.create({
    data: pizzas[1],
  });

  const pizza3 = await prisma.product.create({
    data: pizzas[2],
  });

  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
      generateProductItem({ productId: 1, productPrice: 120 }),
      generateProductItem({ productId: 2, productPrice: 130 }),
      generateProductItem({ productId: 3, productPrice: 80 }),
      generateProductItem({ productId: 4, productPrice: 150 }),
      generateProductItem({ productId: 5, productPrice: 90 }),
      generateProductItem({ productId: 6, productPrice: 75 }),
      generateProductItem({ productId: 7, productPrice: 100 }),
      generateProductItem({ productId: 8, productPrice: 105 }),
      generateProductItem({ productId: 9, productPrice: 90 }),
      generateProductItem({ productId: 10, productPrice: 95 }),
      generateProductItem({ productId: 11, productPrice: 100 }),
      generateProductItem({ productId: 12, productPrice: 85 }),
      generateProductItem({ productId: 13, productPrice: 95 }),
      generateProductItem({ productId: 14, productPrice: 90 }),
      generateProductItem({ productId: 15, productPrice: 85 }),
      generateProductItem({ productId: 16, productPrice: 70 }),
      generateProductItem({ productId: 17, productPrice: 80 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '22222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
};

const down = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;
};

const main = async () => {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
