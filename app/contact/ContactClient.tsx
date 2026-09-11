"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";
import { EMAIL_ID, whatsapp_url } from "@/utils/config";
import { trackWhatsAppLead } from "@/lib/analytics";
import { STORE_LOCATIONS } from "@/data/storeLocations";

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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-border/50 bg-white/80 backdrop-blur-md shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium mb-1 block">
                    Your Name <span className="text-destructive" aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    required
                    aria-required="true"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-sm font-medium mb-1 block">
                    Phone Number <span className="text-destructive" aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    required
                    aria-required="true"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 9342727735"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium mb-1 block">
                    Email Address <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium mb-1 block">
                    Message <span className="text-destructive" aria-hidden="true">*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    aria-required="true"
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

          {/* Showrooms & Quick Contacts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 flex flex-col justify-between"
          >
            {/* General Contact Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-5 border-border/50 bg-white/80 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Phone / WhatsApp</h3>
                    <a href="tel:+919342727735" className="text-primary text-xs font-semibold hover:underline">
                      +91 9342727735
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border/50 bg-white/80 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Email Support</h3>
                    <a href={`mailto:${EMAIL_ID}`} className="text-primary text-xs font-semibold hover:underline truncate block">
                      {EMAIL_ID}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Showroom Locations Summary */}
            <Card className="p-6 border-border/50 bg-white/80 backdrop-blur-md shadow-xl flex-1 flex flex-col">
              <h3 className="font-bold text-xl mb-4 text-foreground flex items-center justify-between">
                <span>Our 4 Showrooms</span>
                <span className="text-xs font-normal text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Visit Us Today
                </span>
              </h3>

              <div className="space-y-4 flex-1">
                {STORE_LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-3.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                          {loc.branchName}
                          {loc.isMain && (
                            <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full">
                              Main
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{loc.address}</p>
                      </div>
                    </div>
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors flex-shrink-0"
                      title={`Get directions to ${loc.branchName}`}
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Interactive Google Map with all 4 locations */}
        <GoogleMap />
      </div>
    </div>
  );
}
