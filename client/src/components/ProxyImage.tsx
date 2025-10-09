import { useState, useEffect } from 'react';
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
  const [currentUrl, setCurrentUrl] = useState('');
  const [urlIndex, setUrlIndex] = useState(0);

  // Create a proxy URL using a public CORS proxy
  const getProxyUrl = (url: string) => {
    // Use a CORS proxy service
    return `https://cors-anywhere.herokuapp.com/${url}`;
  };

  // Alternative: Use images.weserv.nl as a proxy with webp support
  const getWeservUrl = (url: string, options: { format?: string; quality?: number } = {}) => {
    const { format, quality = 85 } = options;
    let params = `url=${encodeURIComponent(url)}&q=${quality}&maxage=7d`;
    
    // Only add output format if specified
    if (format) {
      params += `&output=${format}`;
    }
    
    return `https://images.weserv.nl/?${params}`;
  };

  // Get multiple URL options to try
  const getUrlOptions = (url: string): string[] => {
    return [
      // Try direct weserv without format conversion (best for webp)
      getWeservUrl(url),
      // Try with different quality settings
      getWeservUrl(url, { quality: 90 }),
      // Try forcing PNG output
      getWeservUrl(url, { format: 'png' }),
      // Try forcing JPEG output
      getWeservUrl(url, { format: 'jpg', quality: 90 }),
      // Try direct URL without proxy
      url,
    ];
  };

  useEffect(() => {
    // Reset when src changes
    const urlOptions = getUrlOptions(src);
    setUrlIndex(0);
    setCurrentUrl(urlOptions[0]);
    setLoading(true);
    setError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    // Update current URL when index changes
    const urlOptions = getUrlOptions(src);
    if (urlOptions[urlIndex]) {
      setCurrentUrl(urlOptions[urlIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlIndex]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    console.log(`Image loaded successfully (attempt ${urlIndex + 1}):`, currentUrl);
    onLoad?.();
  };

  const handleError = () => {
    // Try next URL option
    const urlOptions = getUrlOptions(src);
    console.log(`Image failed to load (attempt ${urlIndex + 1}/${urlOptions.length}):`, currentUrl);
    
    if (urlIndex < urlOptions.length - 1) {
      setUrlIndex(prev => prev + 1);
      setLoading(true);
      console.log(`Trying fallback URL (${urlIndex + 2}/${urlOptions.length})`);
    } else {
      setLoading(false);
      setError(true);
      console.error('All image URL attempts failed for:', src);
      onError?.();
    }
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
        src={currentUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        crossOrigin="anonymous"
      />
    </div>
  );
}
