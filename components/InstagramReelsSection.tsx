"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { INSTAGRAM_REELS } from "@/data/instagramReels";
import { useNetworkSpeed } from "@/hooks/useNetworkSpeed";
import { instagram_url } from "@/utils/config";
import { 
  Instagram, 
  Wifi, 
  Zap, 
  ExternalLink, 
  Play, 
  Gauge, 
  Sparkles, 
  ShieldCheck,
  Video,
  Film,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InstagramReelsSection() {
  const {
    currentQuality,
    networkBadgeLabel,
  } = useNetworkSpeed();

  // Track sequential one-by-one load count when network is stable
  const [loadedCount, setLoadedCount] = useState<number>(0);
  // Manual trigger for individual cards on slow networks
  const [manualLoaded, setManualLoaded] = useState<Record<string, boolean>>({});

  const isStableNetwork = currentQuality === "high";

  // Sequential 1-by-1 loading queue effect when network is stable
  useEffect(() => {
    if (isStableNetwork) {
      if (loadedCount < INSTAGRAM_REELS.length) {
        const timer = setTimeout(() => {
          setLoadedCount((prev) => prev + 1);
          // Re-trigger Instagram SDK embed processor after each new frame mounts
          if (typeof window !== "undefined" && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }, 450); // 450ms staggered delay between loading each Reel
        return () => clearTimeout(timer);
      }
    } else {
      // Reset sequential queue if network drops to unstable/slow mode
      setLoadedCount(0);
    }
  }, [isStableNetwork, loadedCount]);

  const toggleManualLoad = (id: string) => {
    setManualLoaded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }}
      />

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/15 via-pink-500/15 to-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/15 via-rose-500/15 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-500/30 text-xs font-bold text-pink-300 mb-4 backdrop-blur-md">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@ktr_cycleworld_tirunelveli</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white mb-4">
            Watch Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400">Instagram Reels & Videos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real test rides, new stock walkthroughs, and customer stories directly from our Tirunelveli showrooms.
          </p>
        </motion.div>

        {/* Dynamic Network Stability & Sequential Loading Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-10 p-3.5 sm:p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex items-center justify-center gap-3"
        >
          <div className={`p-2 rounded-full ${
            isStableNetwork
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : currentQuality === "medium"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          }`}>
            {isStableNetwork ? (
              <Zap className="w-4 h-4 animate-pulse text-emerald-400" />
            ) : currentQuality === "medium" ? (
              <Wifi className="w-4 h-4 text-amber-400" />
            ) : (
              <Gauge className="w-4 h-4 text-rose-400" />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="font-semibold text-slate-300">
              {isStableNetwork ? "Stable Network Detected:" : "Network Optimization:"}
            </span>
            <Badge variant="outline" className={`text-[11px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
              isStableNetwork
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : currentQuality === "medium"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
            }`}>
              {isStableNetwork
                ? `Sequential HD Loading (${Math.min(loadedCount, INSTAGRAM_REELS.length)}/${INSTAGRAM_REELS.length})`
                : currentQuality === "medium"
                ? "720p Balanced Mode"
                : "Data Saver Active"}
            </Badge>
          </div>
        </motion.div>

        {/* Reels Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INSTAGRAM_REELS.map((reel, index) => {
            const isFrameActive = (isStableNetwork && index < loadedCount) || manualLoaded[reel.id];

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col bg-slate-900/90 rounded-2xl border border-white/10 shadow-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/15"
              >
                {/* Top Header */}
                <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-slate-950/80 backdrop-blur-md z-10">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-amber-400" />
                      </div>
                    </div>
                    <div className="truncate">
                      <h3 className="text-xs font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                        {reel.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 truncate">KTR Cycle World • Instagram Reel</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-[10px] font-bold bg-pink-500/10 text-pink-300 border-pink-500/30 px-2 py-0.5">
                    <Film className="w-3 h-3 mr-1 text-pink-400" /> Reel #{index + 1}
                  </Badge>
                </div>

                {/* Video Player / Frame Container */}
                <div className="relative w-full aspect-[9/13] bg-slate-950 overflow-hidden flex items-center justify-center">
                  {isFrameActive ? (
                    <iframe
                      src={reel.embedUrl}
                      title={reel.title}
                      className="w-full h-full border-0 animate-in fade-in duration-500"
                      loading="lazy"
                      allowTransparency
                      allow="encrypted-media"
                    />
                  ) : (
                    /* Poster Card Player (Before sequential queue reaches card or on slow connections) */
                    <div
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 group/poster cursor-pointer"
                      onClick={() => window.open(reel.url, "_blank")}
                    >
                      {/* Poster Image */}
                      {reel.thumbnailPlaceholder && (
                        <img
                          src={reel.thumbnailPlaceholder}
                          alt={reel.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/poster:scale-110 opacity-40"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />

                      {/* Status indicator on poster */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold backdrop-blur-md border shadow-lg ${
                          isStableNetwork
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                            : "bg-amber-950/80 text-amber-300 border-amber-500/40"
                        }`}>
                          {isStableNetwork ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                              Queued #{index + 1}
                            </>
                          ) : (
                            <>
                              <Video className="w-3 h-3" />
                              Data Saver Poster
                            </>
                          )}
                        </span>
                      </div>

                      {/* Play Action Overlay */}
                      <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-2xl shadow-rose-500/30 group-hover/poster:shadow-amber-500/50 transition-all duration-300"
                        >
                          <Play className="w-8 h-8 fill-slate-950 ml-1" />
                        </motion.div>
                        <span className="mt-3 px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/20 text-xs font-bold text-white shadow-xl backdrop-blur-md group-hover/poster:bg-amber-500 group-hover/poster:text-slate-950 transition-all">
                          Watch Reel Video
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Caption & Watch Button */}
                <div className="p-4 bg-slate-950/90 border-t border-white/10 flex flex-col justify-between flex-1">
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {reel.caption}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Showroom Reel
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(reel.url, "_blank")}
                      className="rounded-full text-xs font-bold border-pink-500/30 text-pink-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all gap-1.5 px-3 py-1"
                    >
                      <span>Watch Reel</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Instagram Channel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Button
            size="lg"
            onClick={() => window.open(instagram_url, "_blank")}
            className="rounded-full px-8 py-6 text-sm font-extrabold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 hover:brightness-110 shadow-xl shadow-pink-500/20 transition-all duration-300 flex items-center gap-2.5 mx-auto group"
            data-testid="button-visit-instagram-channel"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Follow @ktr_cycleworld_tirunelveli on Instagram</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
