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
    'road bikes Vannarpettai',
    'bicycle shop Tamil Nadu',
  ],
  authors: [{ name: 'KTR Cycle World' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ktrcycleworld.com',
  },
  icons: {
    icon: '/assets/generated_images/ktr_cycle_logo.jpg',
    apple: '/assets/generated_images/ktr_cycle_logo.jpg',
  },
  openGraph: {
    title: 'KTR Cycle World - Best Cycles in Tirunelveli | Premium Bikes in South Tamil Nadu',
    description:
      'Premium bicycle showroom offering top brand mountain, road, kids and electric cycles in Tirunelveli, Vannarpettai & Palayankottai.',
    url: 'https://ktrcycleworld.com',
    siteName: 'KTR Cycle World',
    images: [
      {
        url: 'https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'KTR Cycle World Tirunelveli',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KTR Cycle World - Best Cycles in Tirunelveli',
    description: 'Leading cycle shop in Tirunelveli, Vannarpettai & Palayankottai. Best cycles in South Tamil Nadu.',
    images: ['https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg'],
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Tirunelveli, Tamil Nadu, India',
    'geo.position': '8.7296942;77.690064',
    'ICBM': '8.7296942, 77.690064',
  },
};

import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
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
