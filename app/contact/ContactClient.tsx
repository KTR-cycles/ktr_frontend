"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";
import { EMAIL_ID, whatsapp_url } from "@/utils/config";
import { trackWhatsAppLead } from "@/lib/analytics";

export default function ContactClient() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in your name, phone number, and message.",
        variant: "destructive",
      });
      return;
    }

    trackWhatsAppLead("contact_form_submit");

    const text = `Hello KTR Cycle World 👋\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const targetUrl = `${whatsapp_url}?text=${encodeURIComponent(text)}`;
    window.open(targetUrl, '_blank');

    toast({
      title: "Opening WhatsApp",
      description: "Redirecting you to send message directly via WhatsApp.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our cycles, prices, or service? We're here to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-border/50 bg-white/80 backdrop-blur-md shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Your Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 9342727735"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email Address (Optional)</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea
                    placeholder="Tell us which cycle you are looking for..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full rounded-full py-6 text-base font-bold">
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-6 border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Showroom Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nainar kulam road, Tirunelveli, Tamil Nadu, India - 627006
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone / WhatsApp</h3>
                  <a href="tel:+919342727735" className="text-primary font-medium hover:underline block">
                    +91 9342727735
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a href={`mailto:${EMAIL_ID}`} className="text-primary font-medium hover:underline block">
                    {EMAIL_ID}
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <GoogleMap />
      </div>
    </div>
  );
}
