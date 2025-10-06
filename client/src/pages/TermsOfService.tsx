import { motion } from "framer-motion";
import { FileCheck, Package, DollarSign, Truck, RefreshCw, Award, Shield, Copyright, Scale, Edit, Link } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PATHS } from "@/components/path";

export default function TermsOfService() {
  const { CONTACT, PRIVACY_POLICY } = PATHS
  const sections = [
    {
      icon: Package,
      title: "Product Availability",
      content: "All products listed on our website or in-store are subject to availability. We strive to keep our inventory up to date, but occasionally items may be out of stock."
    },
    {
      icon: DollarSign,
      title: "Pricing",
      content: "Prices of products are subject to change without prior notice. However, once you place an order, the price will remain fixed for that transaction."
    },
    {
      icon: FileCheck,
      title: "Order Confirmation",
      content: "After placing an order, you will receive an email confirming receipt of your order. This email will only be an acknowledgment and will not constitute acceptance of your order. A contract between us for the purchase of the goods will not be formed until your payment has been approved by us and we have debited your credit or debit card."
    },
    {
      icon: Truck,
      title: "Delivery",
      content: "We aim to dispatch all orders within 2 to 3 working days of receiving payment. Delivery times may vary depending on your location and other factors beyond our control. It includes free Shipping."
    },
    {
      icon: RefreshCw,
      title: "Returns and Refunds",
      content: "We want you to be completely satisfied with your purchase. If you are not satisfied with your purchase for any reason, please contact us within 5 Working days of receiving your order to arrange for a return and refund."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      content: "We take great care in sourcing and packaging our products to ensure they reach you in perfect condition. However, if you receive a product that is damaged or of unsatisfactory quality, please contact us immediately to arrange for a replacement or refund."
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      content: "We respect your privacy and are committed to protecting your personal information. Any personal information you provide to us will be used solely for the purpose of processing your order and will not be shared with third parties."
    },
    {
      icon: Copyright,
      title: "Copyright",
      content: "All content included on our website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of our company or its content suppliers and is protected by international copyright laws."
    },
    {
      icon: Scale,
      title: "Governing Law",
      content: "These terms and conditions shall be governed by and construed in accordance with the laws of India, and any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of TamilNadu."
    },
    {
      icon: Edit,
      title: "Changes to Terms and Conditions",
      content: "We reserve the right to update or modify these terms and conditions at any time without prior notice. Your continued use of our website or services following any such changes constitutes your acceptance of the new terms and conditions."
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
              <FileCheck className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our services or making a purchase
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                  className={index === sections.length - 1 && sections.length % 2 !== 0 ? "md:col-span-2" : ""}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-md border-border/50 shadow-lg p-6 md:p-8 hover-elevate transition-all duration-300 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed ml-16">
                      {section.content}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-primary/20 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Questions About Our Terms?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions or concerns regarding these terms and conditions, please don't hesitate to contact us
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CONTACT}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover-elevate active-elevate-2 transition-all"
                  data-testid="link-contact"
                >
                  Contact Us
                </a>
                <a
                  href={PRIVACY_POLICY}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white/80 text-foreground rounded-full font-semibold hover-elevate active-elevate-2 transition-all border-2 border-border"
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
