import { Heading, Text, Button, Img } from '@react-email/components';
import { Layout } from './layout';
import { APP_URL } from '@/common/config';

interface Props {
  orderId: string;
  totalAmount: number;
  paymentUrl: string;
}

export const Checkout = ({ orderId, totalAmount, paymentUrl }: Props) => {
  return (
    <Layout>
      <Img
        src={`${APP_URL}/assets/images/success.png`}
        width="50px"
        height="50px"
        style={{
          margin: '0 auto',
        }}
      />
      <Heading as="h2" style={{ marginBottom: '10px' }}>
        Заказ успешно оформлен!
      </Heading>
      <Text
        style={{
          margin: 0,
          fontSize: '14px',
          color: '#b1b1b1',
        }}
      >
        ID: {orderId}
      </Text>
      <Text
        style={{
          fontSize: '18px',
        }}
      >
        Вы оформили заказ на сумму {totalAmount} ₴
      </Text>
      <Button
        href={paymentUrl}
        style={{
          width: '150px',
          marginTop: '15px',
          padding: '12px',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '20px',
          backgroundColor: '#ff640b',
        }}
      >
        Оплатить
      </Button>
      <Text style={{ margin: 0, height: 0, opacity: 0 }}>{Date.now()}</Text>
    </Layout>
  );
};
