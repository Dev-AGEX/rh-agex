import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: 'Agex • %s',
    default: 'Agex • Trabalhe conosco',
  },
  description: 'Agex Transportes - Soluções em logística e transporte',
  icons: [
    { rel: 'icon', url: '/icon.png' },
    { rel: 'apple-touch-icon', url: '/icon.png' },
    { rel: 'shortcut icon', url: '/icon.png' },
  ],
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}