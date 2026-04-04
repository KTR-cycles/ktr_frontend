import HeroCarousel from "@/components/HeroCarousel";
import MotivationQuotes from "@/components/MotivationQuotes";
import CyclingBenefits from "@/components/CyclingBenefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import GoogleMap from "@/components/GoogleMap";
import AgeGroupShopNav from "@/components/AgeGroupShopNav";
import wellnessImage from '@assets/generated_images/Peaceful_cycling_wellness_moment_d0d89c90.png';
import { motivationQuotes, cyclingBenefits } from '@/data/homeContent';
import { heroSlides } from '@/data/homeContentDynamic';

export default function Home() {
  return (
    <div className="w-full">
      <AgeGroupShopNav />

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
