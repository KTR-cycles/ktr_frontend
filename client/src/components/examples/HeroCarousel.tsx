import HeroCarousel from '../HeroCarousel';
import mountainImage from '@assets/generated_images/Mountain_biking_adventure_scene_01077af1.png';
import urbanImage from '@assets/generated_images/Urban_cycling_lifestyle_shot_0317efee.png';
import groupImage from '@assets/generated_images/Group_cycling_community_scene_9b549ad4.png';
import sunsetImage from '@assets/generated_images/Inspirational_cycling_sunset_silhouette_5fa0f6c8.png';

export default function HeroCarouselExample() {
  const slides = [
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

  return <HeroCarousel slides={slides} />;
}
