'use server';

import { cookies } from 'next/headers';
import { hashSync } from 'bcrypt';
import { render } from '@react-email/components';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import * as liqpay from '@/common/services/liqpay';
import { transporter } from '@/common/services/nodemailer';
import { clearCart } from './api/cart/utils/clear-cart';
import { calcTaxPrice } from '@/common/utils';
import { getSessionUser } from '@/common/lib';
import { DELIVERY_PRICE } from '@/common/constants';
import { MAIL_FROM } from '@/common/config';
import type { CheckoutFormValues } from '@/components/shared/checkout/types';

import { Checkout, UserVerification } from '@/components/shared/email-templates';

export const createOrder = async (values: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('cartToken')?.value;

    if (!token) {
      throw new Error('Cart token was not found');
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
        },
      },
    });

    if (!userCart) {
      throw new Error('Cart was not found');
    }

    if (!userCart.totalAmount) {
      throw new Error('Cart is empty');
    }

    const taxPrice = calcTaxPrice(userCart.totalAmount);
    const totalAmount = userCart.totalAmount + DELIVERY_PRICE + taxPrice;

    const order = await prisma.order.create({
      data: {
        token,
        items: JSON.stringify(userCart.items),
        totalAmount,
        status: OrderStatus.PENDING,
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        address: values.address,
        comment: values.comment,
      },
    });

    const paymentUrl = await liqpay.getPaymentUrl(order.id, order.totalAmount);

    if (!paymentUrl) {
      throw new Error(`Payment url was missing`);
    }

    await clearCart(userCart.id);

    await transporter.sendMail({
      from: MAIL_FROM,
      to: order.email,
      subject: 'Next Pizza | New Order',
      html: render(
        Checkout({
          orderId: order.id,
          totalAmount: order.totalAmount,
          paymentUrl,
        })
      ),
    });

    return paymentUrl;
  } catch (e) {
    throw e;
  }
};

export const registerUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('User email is not verified');
      }

      throw new Error('User with this email already exists');
    }

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashSync(data.password, 6),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: newUser.id,
      },
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: data.email,
      subject: 'Next Pizza | Account verify',
      html: render(UserVerification({ code })),
    });
  } catch (e) {
    throw e;
  }
};

export const updateUserInfo = async (data: Prisma.UserUpdateInput) => {
  try {
    const user = await getSessionUser();

    if (!user) {
      throw new Error('User was not found');
    }

    await prisma.user.update({
      where: { id: Number(user.id) },
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password ? hashSync(String(data.password), 6) : undefined,
      },
    });
  } catch (e) {
    throw e;
  }
};
