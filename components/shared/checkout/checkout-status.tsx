import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { OrderStatus, type Order } from '@prisma/client';

import { Container } from '../container';
import { Title } from '../title';
import { Button } from '@/components/ui';

interface Props {
  order?: Order;
}

export const CheckoutStatus: React.FC<Props> = ({ order }) => {
  return (
    <Container className="min-h-[60dvh] flex items-center">
      <div className="mx-auto p-12 w-[min(500px,90vw)] flex flex-col items-center text-center rounded-[20px] bg-white">
        {order ? (
          <>
            <Image
              src={`/assets/images/${
                order.status === OrderStatus.SUCCEEDED ? 'success' : 'failed'
              }.png`}
              width={60}
              height={60}
              alt="status"
            />
            <Title
              className="mt-4 font-extrabold"
              text={
                order.status === OrderStatus.SUCCEEDED
                  ? 'Заказ успешно оплачен!'
                  : 'При обработке платежа произошла ошибка!'
              }
              size="md"
            />
            <p className="mt-1 text-[14px] text-[#b1b1b1]">ID: {order.id}</p>
          </>
        ) : (
          <>
            <Image src="/assets/images/failed.png" width={60} height={60} alt="status" />
            <Title className="mt-4 font-extrabold" text="Заказ не найден!" size="md" />
          </>
        )}
        <Link href="/">
          <Button className="mt-4 text-[16px] rounded-[8px]">Вернуться в магазин</Button>
        </Link>
      </div>
    </Container>
  );
};
