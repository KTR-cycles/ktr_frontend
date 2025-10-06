import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PATHS } from "@/components/path";

export default function PrivacyPolicy() {
  const { CONTACT } = PATHS
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "When you visit our website or place an order, we may collect the following information:",
          items: [
            "Personal information: Name, email address, mailing address, and phone number.",
            "Payment information: Credit card details or other payment methods.",
            "Order details: Information about the products you purchase and the shipping address.",
            "Automatically collected information: IP address, browser type, browsing preferences, and other details gathered through cookies and tracking technologies."
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
            "To process and fulfill your orders.",
            "To communicate with you about your orders, inquiries, or account.",
            "To send marketing communications, including product updates and promotions, if you have opted in.",
            "To enhance our website and services.",
            "To prevent fraud and misuse of our services."
          ]
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Retention",
      content: [
        {
          text: "We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law."
        }
      ]
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: [
        {
          text: "You have the right to access, correct, or delete your personal information. You may also have the right to object to or restrict certain processing of your personal information. If you would like to exercise any of these rights, please contact us using the contact information provided below."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_var(--primary)_0%,_transparent_50%)]"
        />

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              At KTR Cycleworld, we are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, and disclose personal information when you visit our website or make a purchase from our cycle manufacturing shop.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-white/80 backdrop-blur-md border-border/50 shadow-lg p-6 md:p-8 hover-elevate transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground pt-2">
                        {section.title}
                      </h2>
                    </div>
                    
                    {section.content.map((item, idx) => (
                      <div key={idx} className="space-y-4">
                        {'subtitle' in item && (
                          <p className="text-base md:text-lg text-foreground font-medium">
                            {item.subtitle}
                          </p>
                        )}
                        {'text' in item && (
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            {item.text}
                          </p>
                        )}
                        {'items' in item && (
                          <ul className="space-y-3 ml-4">
                            {item.items.map((listItem: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                <span className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                  {listItem}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </Card>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="bg-white/80 backdrop-blur-md border-border/50 shadow-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Changes to this Privacy Policy
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We encourage you to review this Privacy Policy periodically for any updates.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-md border-primary/20 shadow-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Contact Us
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="flex flex-col gap-4">
                  <a href={CONTACT} className="text-primary hover:text-primary/80">Contact Us</a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
