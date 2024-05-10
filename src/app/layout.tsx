import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });
console.log(inter, 'interfont');

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
