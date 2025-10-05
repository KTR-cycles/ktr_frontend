import { Suspense, lazy } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import MotivationQuotes from "@/components/MotivationQuotes";
import CyclingBenefits from "@/components/CyclingBenefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesSection from "@/components/ServicesSection";
import GoogleMap from "@/components/GoogleMap";
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
      quote: "Two wheels, endless adventures.",
    },
    {
      image: urbanImage,
      quote: "Life is like riding a bicycle.",
      author: "Albert Einstein"
    },
    {
      image: groupImage,
      quote: "Ride together, grow together.",
    },
    {
      image: sunsetImage,
      quote: "It never gets easier, you just go faster.",
      author: "Greg LeMond"
    },
  ];

  const motivationQuotes = [
    {
      text: "Cycling is a simple solution to some of the world's most complicated problems.",
    },
    {
      text: "Give a man a fish and feed him for a day. Teach a man to fish and feed him for a lifetime. Teach a man to cycle and he will realize fishing is stupid and boring.",
      author: "Desmond Tutu"
    },
    {
      text: "When the spirits are low, when the day appears dark, when work becomes monotonous, when hope hardly seems worth having, just mount a bicycle and go out for a spin down the road.",
      author: "Arthur Conan Doyle"
    },
  ];

  const cyclingBenefits = [
    {
      icon: "heart" as const,
      title: "Cardiovascular Health",
      description: "Strengthen your heart, improve circulation, and reduce the risk of heart disease with regular cycling."
    },
    {
      icon: "zap" as const,
      title: "Build Stamina & Strength",
      description: "Increase your endurance and muscle strength while enjoying the journey."
    },
    {
      icon: "smile" as const,
      title: "Mental Wellbeing",
      description: "Reduce stress, anxiety, and depression. Cycling releases endorphins that boost your mood."
    },
    {
      icon: "trending" as const,
      title: "Weight Management",
      description: "Burn calories efficiently and maintain a healthy weight through regular cycling."
    },
    {
      icon: "users" as const,
      title: "Social Connection",
      description: "Join cycling groups and communities. Make friends and share adventures together."
    },
    {
      icon: "leaf" as const,
      title: "Eco-Friendly Transport",
      description: "Reduce your carbon footprint and contribute to a cleaner, greener environment."
    },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Mountain Explorer Pro 29",
      brand: "KTR Sports",
      image: bikeImage,
      actualPrice: 45000,
      discount: 20,
      currentPrice: 36000,
      category: "Mountain Bike"
    },
    {
      id: "2",
      name: "City Cruiser Elite",
      brand: "KTR Urban",
      image: bikeImage,
      actualPrice: 28000,
      discount: 15,
      currentPrice: 23800,
      category: "City Bike"
    },
    {
      id: "3",
      name: "Road Racer X1",
      brand: "KTR Performance",
      image: bikeImage,
      actualPrice: 55000,
      discount: 10,
      currentPrice: 49500,
      category: "Road Bike"
    },
  ];

  const services = [
    {
      icon: "delivery" as const,
      title: "Free Delivery",
      description: "Get your cycle delivered to your doorstep at no extra cost within city limits."
    },
    {
      icon: "pickup" as const,
      title: "Easy Pickup",
      description: "Visit our showroom to see and test ride your favorite cycles before purchase."
    },
    {
      icon: "quality" as const,
      title: "Premium Quality",
      description: "All our cycles undergo rigorous quality checks to ensure the best performance."
    },
    {
      icon: "experience" as const,
      title: "Expert Guidance",
      description: "Our experienced team helps you choose the perfect cycle for your needs."
    },
  ];

  return (
    <div className="w-full">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <HeroCarousel slides={heroSlides} />
      </section>

      <MotivationQuotes quotes={motivationQuotes} image={wellnessImage} />

      <CyclingBenefits benefits={cyclingBenefits} />

      <FeaturedProducts
        products={featuredProducts}
        onViewDetails={(id) => console.log('View product:', id)}
        onViewAll={() => console.log('View all products')}
      />

      <ServicesSection services={services} />

      <GoogleMap />
    </div>
  );
}
