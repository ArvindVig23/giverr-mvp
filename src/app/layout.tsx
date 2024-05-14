import type { Metadata } from 'next';
import './globals.scss';
import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
