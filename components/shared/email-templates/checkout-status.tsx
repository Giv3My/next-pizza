import { APP_URL } from '@/common/config';
import { OrderStatus } from '@prisma/client';

import { Heading, Img, Text, Button } from '@react-email/components';
import { Layout } from './layout';

interface Props {
  orderId: string;
  status: OrderStatus;
}

export const CheckoutStatus = ({ orderId, status }: Props) => {
  return (
    <Layout>
      <Img
        src={`${APP_URL}/assets/images/${
          status === OrderStatus.SUCCEEDED ? 'success' : 'failed'
        }.png`}
        width="50px"
        height="50px"
        style={{
          margin: '0 auto',
        }}
      />
      <Heading as="h2" style={{ marginBottom: '10px' }}>
        {status === OrderStatus.SUCCEEDED
          ? 'Заказ успешно оплачен!'
          : 'При обработке платежа произошла ошибка!'}
      </Heading>
      <Text
        style={{
          marginTop: 0,
          fontSize: '14px',
          color: '#b1b1b1',
        }}
      >
        ID: {orderId}
      </Text>
      <Button
        href={APP_URL}
        style={{
          width: '230px',
          marginTop: '15px',
          padding: '12px',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '20px',
          backgroundColor: '#ff640b',
        }}
      >
        Вернуться в магазин
      </Button>
      <Text style={{ margin: 0, height: 0, opacity: 0 }}>{Date.now()}</Text>
    </Layout>
  );
};
