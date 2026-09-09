import type { Metadata } from 'next';
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Privacy Policy | KTR Cycle World Tirunelveli',
  description: 'Read the privacy policy for KTR Cycle World. Learn how we handle and protect customer inquiry and showroom information.',
  alternates: {
    canonical: 'https://ktrcycleworld.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "When you visit our website or send an inquiry, we may collect the following information:",
          items: [
            "Personal information: Name, email address, mailing address, and phone number.",
            "Inquiry details: Information about the cycle products you are interested in.",
            "Automatically collected information: IP address, browser type, browsing preferences, and standard web analytics."
          ]
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "We may use your personal information for the following purposes:",
          items: [
            "To respond to your inquiries and cycle product availability requests.",
            "To communicate with you about showroom visits and services.",
            "To enhance our website catalog and user experience.",
            "To prevent spam and misuse."
          ]
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Retention",
      content: [
        {
          text: "We retain customer inquiry information for as long as necessary to fulfill your requests, unless a longer retention period is required by law."
        }
      ]
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: [
        {
          text: "You have the right to access, update, or request deletion of your personal contact information at any time by contacting KTR Cycle World."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            How KTR Cycle World respects and protects your personal information
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <Card className="p-8 border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>

                  {section.content.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-3">
                      {'subtitle' in item && item.subtitle && (
                        <p className="text-foreground font-medium">{item.subtitle}</p>
                      )}
                      {'items' in item && item.items && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                          {item.items.map((bullet, bulletIdx) => (
                            <li key={bulletIdx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                      {'text' in item && item.text && (
                        <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                      )}
                    </div>
                  ))}
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact">
            <span className="text-primary hover:underline font-semibold cursor-pointer">
              Have questions? Contact KTR Cycle World
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
