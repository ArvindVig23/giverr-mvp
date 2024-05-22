import type { Metadata } from 'next';
import './globals.scss';
import './fonts.css';
import React from 'react';
import { ReduxProvider } from './redux/ReduxProvider';

import AppWrapper from '@/components/container/AppWrapper';
export const metadata: Metadata = {
  title: 'Giverr',
  description: 'Events Management Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
