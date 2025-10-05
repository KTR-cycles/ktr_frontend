import MotivationQuotes from '../MotivationQuotes';
import wellnessImage from '@assets/generated_images/Peaceful_cycling_wellness_moment_d0d89c90.png';

export default function MotivationQuotesExample() {
  const quotes = [
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

  return <MotivationQuotes quotes={quotes} image={wellnessImage} />;
}
