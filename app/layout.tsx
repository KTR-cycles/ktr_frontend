import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyContactButtons from '@/components/StickyContactButtons';
import ScrollToTop from '@/components/ScrollToTop';
import LocalSEO from '@/components/LocalSEO';
import Providers from '@/components/Providers';
import NavigationLoader from '@/components/NavigationLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ktrcycleworld.com'),
  title: {
    default: 'KTR Cycle World - Best Cycles in Tirunelveli | Premium Bikes in Vannarpettai & Palayankottai',
    template: '%s | KTR Cycle World',
  },
  description:
    'Discover the best cycles in Tirunelveli at KTR Cycle World. Wide range of mountain bikes, road bikes, electric cycles, kids cycles & accessories in Vannarpettai and Palayankottai, South Tamil Nadu.',
  keywords: [
    'KTR Cycle',
    'KTR Cycle World',
    'best cycle in Tirunelveli',
    'cycles in Vannarpettai',
    'cycles in Palayankottai',
    'best cycle shop Tirunelveli',
    'cycle store South Tamil Nadu',
    'electric cycles Palayankottai',
    'mountain bikes Tirunelveli',
  ],
  openGraph: {
    title: 'KTR Cycle World - Best Cycles in Tirunelveli',
    description:
      'Premium bicycle showroom offering top brand cycles in Tirunelveli, Vannarpettai & Palayankottai.',
    url: 'https://ktrcycleworld.com',
    siteName: 'KTR Cycle World',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <Providers>
          <NavigationLoader />
          <ScrollToTop />
          <LocalSEO />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyContactButtons />
        </Providers>
      </body>
    </html>
  );
}
