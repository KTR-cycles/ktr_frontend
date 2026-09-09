import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Showroom Address & WhatsApp | KTR Cycle World Tirunelveli',
  description: 'Get in touch with KTR Cycle World in Tirunelveli. Visit our showroom at Nainar kulam road, or contact us via WhatsApp at +91 9342727735 for bicycle availability & delivery in Vannarpettai and Palayankottai.',
  keywords: [
    'contact KTR Cycle World',
    'KTR Cycle World phone number',
    'cycle shop Tirunelveli address',
    'Vannarpettai cycle shop phone',
    'Palayankottai cycle store contact',
  ],
  alternates: {
    canonical: 'https://ktrcycleworld.com/contact',
  },
  openGraph: {
    title: 'Contact Us | KTR Cycle World Showroom Tirunelveli',
    description: 'Visit our bicycle showroom in Tirunelveli or contact us via WhatsApp for doorstep delivery and cycle inquiries.',
    url: 'https://ktrcycleworld.com/contact',
    siteName: 'KTR Cycle World',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact KTR Cycle World Tirunelveli',
    description: 'Visit our showroom or message us via WhatsApp for instant bicycle inquiries.',
  },
};

export default function ContactUsPage() {
  return <ContactClient />;
}
