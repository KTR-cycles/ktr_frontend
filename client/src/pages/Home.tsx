import { Suspense, lazy } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import MotivationQuotes from "@/components/MotivationQuotes";
import CyclingBenefits from "@/components/CyclingBenefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesSection from "@/components/ServicesSection";
import GoogleMap from "@/components/GoogleMap";
import CategoryCarousel from "@/components/CategoryCarousel";
import mountainImage from '@assets/generated_images/Mountain_biking_adventure_scene_01077af1.png';
import urbanImage from '@assets/generated_images/Urban_cycling_lifestyle_shot_0317efee.png';
import groupImage from '@assets/generated_images/Group_cycling_community_scene_9b549ad4.png';
import sunsetImage from '@assets/generated_images/Inspirational_cycling_sunset_silhouette_5fa0f6c8.png';
import wellnessImage from '@assets/generated_images/Peaceful_cycling_wellness_moment_d0d89c90.png';
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';

export default function Home() {
  const heroSlides = [
    {
      image: mountainImage,
      quote: "Tirunelveli’s best cycles. Start your adventure.",
    },
    {
      image: urbanImage,
      quote: "Premium rides for South Tamil Nadu.",
    },
    {
      image: groupImage,
      quote: "Ride together. Grow together.",
    },
    {
      image: sunsetImage,
      quote: "Go faster with KTR Cycle World.",
    },
         
  ];

  const motivationQuotes = [
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

  const cyclingBenefits = [
    {
      icon: "heart" as const,
      title: "Cardiovascular Health",
      description: "Strengthen your heart, improve circulation, and reduce the risk of heart disease with regular cycling. Best cycles in Tirunelveli for your health journey."
    },
    {
      icon: "zap" as const,
      title: "Build Stamina & Strength",
      description: "Increase your endurance and muscle strength while enjoying the journey. Premium cycles in South Tamil Nadu for optimal performance."
    },
    {
      icon: "smile" as const,
      title: "Mental Wellbeing",
      description: "Reduce stress, anxiety, and depression. Cycling releases endorphins that boost your mood. Best cycle shop in Vannarpettai for your mental health."
    },
    {
      icon: "trending" as const,
      title: "Weight Management",
      description: "Burn calories efficiently and maintain a healthy weight through regular cycling. Quality cycles in Palayankottai for fitness goals."
    },
    {
      icon: "users" as const,
      title: "Social Connection",
      description: "Join cycling groups and communities. Make friends and share adventures together. KTR Cycle World community in Tirunelveli."
    },
    {
      icon: "leaf" as const,
      title: "Eco-Friendly Transport",
      description: "Reduce your carbon footprint and contribute to a cleaner, greener environment. Electric cycles in South Tamil Nadu for sustainable commuting."
    },
  ];


  const services = [
    {
      icon: "delivery" as const,
      title: "Free Delivery",
      description: "Get your cycle delivered to your doorstep at no extra cost within Tirunelveli, Vannarpettai, and Palayankottai areas."
    },
    {
      icon: "pickup" as const,
      title: "Easy Pickup",
      description: "Visit our showroom in Tirunelveli to see and test ride your favorite cycles before purchase. Best cycle shop in South Tamil Nadu."
    },
    {
      icon: "quality" as const,
      title: "Premium Quality",
      description: "All our cycles undergo rigorous quality checks to ensure the best performance. Best cycles in Tirunelveli with guaranteed quality."
    },
    {
      icon: "experience" as const,
      title: "Expert Guidance",
      description: "Our experienced team helps you choose the perfect cycle for your needs. Expert service in Vannarpettai and Palayankottai."
    },
  ];

  return (
    <div className="w-full">
      {/* Category Carousel - Scrolls with page, not sticky */}
      <CategoryCarousel />
      
      <section className="w-full">
        <HeroCarousel slides={heroSlides} />
      </section>

      <FeaturedProducts />

      <MotivationQuotes quotes={motivationQuotes} image={wellnessImage} />

      

      <CyclingBenefits benefits={cyclingBenefits} />

      

      {/* <ServicesSection services={services} /> */}

      <GoogleMap />
    </div>
  );
}
