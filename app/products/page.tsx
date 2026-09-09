import type { Metadata } from 'next';
import ProductCatalogClient from './ProductCatalogClient';

export const metadata: Metadata = {
  title: 'Full Bicycles Catalog | Mountain, Road & Kids Cycles Tirunelveli',
  description: 'Explore the complete cycle catalog at KTR Cycle World, Tirunelveli. Wide range of mountain bikes, road bikes, geared cycles, girls cycles & electric cycles at best prices in Vannarpettai & Palayankottai.',
  keywords: [
    'bicycle catalog Tirunelveli',
    'buy cycles Tirunelveli',
    'mountain bikes Vannarpettai',
    'kids cycle Palayankottai',
    'electric cycles South Tamil Nadu',
    'KTR Cycle World catalog',
  ],
  alternates: {
    canonical: 'https://ktrcycleworld.com/products',
  },
  openGraph: {
    title: 'Full Bicycles Catalog | KTR Cycle World Tirunelveli',
    description: 'Explore mountain, road, kids and electric cycles at KTR Cycle World, Tirunelveli.',
    url: 'https://ktrcycleworld.com/products',
    siteName: 'KTR Cycle World',
    type: 'website',
  },
};

export default function ProductsPage() {
  return <ProductCatalogClient />;
}
