import React from 'react';

import type { Metadata } from 'next';

import { Container, Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza | Checkout',
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <React.Suspense>
        <Header className="border-b-gray-200" hasSearch={false} hasCart={false} />
      </React.Suspense>
      {children}
    </main>
  );
}
