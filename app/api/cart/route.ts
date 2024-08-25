import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/prisma/prisma-client';
import { getUserCart, updateCartTotalAmount } from './utils';
import type { CreateCartItemValues } from '@/common/store/cart/types';

export async function GET(req: NextRequest) {
  const token =
    req.cookies.get('cartToken')?.value || req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ items: [], totalAmount: 0 }, { status: 200 });
  }

  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return NextResponse.json(userCart, { status: 200 });
}

export async function POST(req: NextRequest) {
  let token = req.cookies.get('cartToken')?.value;

  if (!token) {
    token = crypto.randomUUID();
  }

  const userCart = await getUserCart(token);

  const data = (await req.json()) as CreateCartItemValues;

  const cartItemExists = await prisma.cartItem.findFirst({
    where: {
      cartId: userCart.id,
      productItemId: data.productItemId,
      ingredients: { every: { id: { in: data.ingredients } }, some: {} },
    },
  });

  if (cartItemExists) {
    await prisma.cartItem.update({
      where: {
        id: cartItemExists.id,
      },
      data: {
        quantity: cartItemExists.quantity + 1,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          connect: data.ingredients?.map((id) => ({ id })),
        },
        quantity: 1,
      },
    });
  }

  const updatedUserCart = await updateCartTotalAmount(token);

  const response = NextResponse.json(updatedUserCart, { status: 200 });
  response.cookies.set('cartToken', token);
  return response;
}
