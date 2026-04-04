/**
 * Static home page content — motivation quotes, cycling benefits, services.
 *
 * These are intentionally hardcoded and are NOT fetched from any API.
 * Edit this file directly to update these sections.
 *
 * Dynamic content (carousel slides, popular products) lives in homeContentDynamic.ts
 * which is auto-generated at build/dev time by scripts/fetch-home-data.mjs.
 */

import type { MotivationQuote, CyclingBenefit, HomeService } from '../types';

export const motivationQuotes: MotivationQuote[] = [
  {
    text: "Cycling is a simple solution to some of the world's most complicated problems - Best cycles in Tirunelveli at KTR Cycle World.",
  },
  {
    text: "Give a man a fish and feed him for a day. Teach a man to fish and feed him for a lifetime. Teach a man to cycle and he will realize fishing is stupid and boring - Premium cycles in South Tamil Nadu.",
  },
  {
    text: "When the spirits are low, when the day appears dark, when work becomes monotonous, when hope hardly seems worth having, just mount a bicycle and go out for a spin down the road - Best cycle shop in Vannarpettai.",
  },
];

export const cyclingBenefits: CyclingBenefit[] = [
  {
    icon: 'heart',
    title: 'Cardiovascular Health',
    description: 'Strengthen your heart, improve circulation, and reduce the risk of heart disease with regular cycling. Best cycles in Tirunelveli for your health journey.',
  },
  {
    icon: 'zap',
    title: 'Build Stamina & Strength',
    description: 'Increase your endurance and muscle strength while enjoying the journey. Premium cycles in South Tamil Nadu for optimal performance.',
  },
  {
    icon: 'smile',
    title: 'Mental Wellbeing',
    description: 'Reduce stress, anxiety, and depression. Cycling releases endorphins that boost your mood. Best cycle shop in Vannarpettai for your mental health.',
  },
  {
    icon: 'trending',
    title: 'Weight Management',
    description: 'Burn calories efficiently and maintain a healthy weight through regular cycling. Quality cycles in Palayankottai for fitness goals.',
  },
  {
    icon: 'users',
    title: 'Social Connection',
    description: 'Join cycling groups and communities. Make friends and share adventures together. KTR Cycle World community in Tirunelveli.',
  },
  {
    icon: 'leaf',
    title: 'Eco-Friendly Transport',
    description: 'Reduce your carbon footprint and contribute to a cleaner, greener environment. Electric cycles in South Tamil Nadu for sustainable commuting.',
  },
];

export const services: HomeService[] = [
  {
    icon: 'delivery',
    title: 'Free Delivery',
    description: 'Get your cycle delivered to your doorstep at no extra cost within Tirunelveli, Vannarpettai, and Palayankottai areas.',
  },
  {
    icon: 'pickup',
    title: 'Easy Pickup',
    description: 'Visit our showroom in Tirunelveli to see and test ride your favorite cycles before purchase. Best cycle shop in South Tamil Nadu.',
  },
  {
    icon: 'quality',
    title: 'Premium Quality',
    description: 'All our cycles undergo rigorous quality checks to ensure the best performance. Best cycles in Tirunelveli with guaranteed quality.',
  },
  {
    icon: 'experience',
    title: 'Expert Guidance',
    description: 'Our experienced team helps you choose the perfect cycle for your needs. Expert service in Vannarpettai and Palayankottai.',
  },
];
