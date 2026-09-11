"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STORE_LOCATIONS, StoreLocation } from "@/data/storeLocations";

interface GoogleMapProps {
  embedUrl?: string;
  defaultLocationId?: string;
}

export default function GoogleMap({ defaultLocationId = "town" }: GoogleMapProps) {
  const [selectedId, setSelectedId] = useState<string>(defaultLocationId);

  const selectedLocation =
    STORE_LOCATIONS.find((loc) => loc.id === selectedId) || STORE_LOCATIONS[0];

  return (
    <section id="showroom-map" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3">
            <MapPin className="w-4 h-4" /> 4 Showroom Locations
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Visit Our <span className="text-primary">Showrooms</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore premium bicycles in person at any of our 4 convenient store locations across South Tamil Nadu.
          </p>
        </motion.div>

        {/* Branch Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {STORE_LOCATIONS.map((loc) => {
            const isSelected = loc.id === selectedLocation.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-muted hover:bg-accent text-foreground"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                {loc.branchName}
                {loc.isMain && (
                  <span className="ml-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/20">
                    Main
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Map + Selected Location Info Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-10">
          {/* Active Map Preview */}
          <motion.div
            key={selectedLocation.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border border-border bg-card min-h-[350px] flex flex-col"
          >
            <div className="relative flex-1 min-h-[350px]">
              <iframe
                src={selectedLocation.embedUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${selectedLocation.name} Google Map Location`}
              />
            </div>
            <div className="p-4 bg-card/90 backdrop-blur-md border-t border-border flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-foreground">
                  {selectedLocation.name}
                </h4>
                <p className="text-xs text-muted-foreground">{selectedLocation.address}</p>
              </div>
              <Button
                asChild
                size="sm"
                className="rounded-full gap-2 text-xs font-bold"
              >
                <a
                  href={selectedLocation.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </Button>
            </div>
          </motion.div>

          {/* All 4 Branch Cards List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {STORE_LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLocation.id;
              return (
                <Card
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50 bg-card hover:bg-accent/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl ${isSelected ? "bg-primary text-white" : "bg-muted text-primary"}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                          {loc.branchName}
                          {loc.isMain && (
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              Main
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] text-muted-foreground">{loc.tagline}</span>
                      </div>
                    </div>
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                      title="Open in Google Maps"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed pl-10 mb-2">
                    {loc.address}
                  </p>

                  <div className="flex items-center justify-between pl-10 pt-2 border-t border-border/60 text-xs">
                    <a
                      href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-primary hover:underline font-medium"
                    >
                      <Phone className="w-3 h-3" />
                      {loc.phone}
                    </a>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Open Daily
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
