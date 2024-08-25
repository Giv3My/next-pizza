import React from 'react';

import { API_URL } from '@/common/config';

import { Layout } from './layout';
import { Button, Heading, Text } from '@react-email/components';

interface Props {
  code: string;
}

export const UserVerification = ({ code }: Props) => {
  return (
    <Layout>
      <Text style={{ fontSize: '20px' }}>Код подтверждения:</Text>
      <Heading as="h2">{code}</Heading>
      <Button
        href={`${API_URL}/auth/verify?code=${code}`}
        style={{
          width: '230px',
          padding: '12px',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '16px',
          backgroundColor: '#ff640b',
        }}
      >
        Подтвердить регистрацию
      </Button>
      <Text style={{ margin: 0, height: 0, opacity: 0 }}>{Date.now()}</Text>
    </Layout>
  );
};
