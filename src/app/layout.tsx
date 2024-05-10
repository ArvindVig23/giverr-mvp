import type { Metadata } from 'next';
import './globals.scss';
import React from 'react';

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
        {/* <Header/> */}
        {children}
      </body>
    </html>
  );
}
