import ServicesSection from '../ServicesSection';

export default function ServicesSectionExample() {
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

  return <ServicesSection services={services} />;
}
