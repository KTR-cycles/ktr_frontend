"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as CloseIcon, Check, Link2, MessageCircle, Facebook, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productUrl?: string;
}

export default function SharePopup({ isOpen, onClose, productName, productUrl }: SharePopupProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(productUrl || '');

  useEffect(() => {
    if (productUrl) {
      setShareUrl(productUrl);
    } else if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, [productUrl]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const shareText = `Check out ${productName} on KTR Cycle World!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTimeout(() => onClose(), 500);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "X",
      icon: XIcon,
      color: "bg-black hover:bg-gray-900",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-md pointer-events-auto"
            >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1">Share Product</h3>
                    <p className="text-sm text-white/80 truncate">{productName}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20 rounded-full flex-shrink-0 h-9 w-9"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Share Options */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Share via</p>
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {shareOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <motion.button
                        key={option.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(option.url)}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center text-white transition-all shadow-lg`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {option.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Copy Link */}
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Or copy link</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm text-foreground truncate">
                      {shareUrl}
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      className={`rounded-lg px-6 transition-all ${
                        copied 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Success Animation */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700"
                    >
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Link copied to clipboard!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

