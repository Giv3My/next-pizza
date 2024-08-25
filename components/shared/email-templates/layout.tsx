import React from 'react';

import { Html, Head, Body, Container, Font } from '@react-email/components';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Nunito"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,500;1,500&display=swap',
            format: 'woff2',
          }}
          fontWeight="500"
        />
      </Head>
      <Body style={{ padding: '100px', backgroundColor: '#f4f1ee' }}>
        <Container
          style={{
            padding: '50px',
            textAlign: 'center',
            borderRadius: '20px',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  );
};
