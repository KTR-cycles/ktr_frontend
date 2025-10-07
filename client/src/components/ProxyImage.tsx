import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProxyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ProxyImage({ 
  src, 
  alt, 
  className = '', 
  onLoad, 
  onError 
}: ProxyImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Create a proxy URL using a public CORS proxy
  const getProxyUrl = (url: string) => {
    // Use a CORS proxy service
    return `https://cors-anywhere.herokuapp.com/${url}`;
  };

  // Alternative: Use images.weserv.nl as a proxy
  const getWeservUrl = (url: string) => {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
  };

  // Use images.weserv.nl as it's more reliable
  const proxyUrl = getWeservUrl(src);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
  };

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-muted ${className}`}>
        <ImageOff className="w-16 h-16 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={proxyUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        crossOrigin="anonymous"
      />
    </div>
  );
}
