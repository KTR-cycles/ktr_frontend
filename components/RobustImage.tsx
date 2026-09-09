import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface RobustImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function RobustImage({ 
  src, 
  alt, 
  className = '', 
  onLoad, 
  onError 
}: RobustImageProps) {
  const [currentSrc, setCurrentSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      setLoading(false);
      return;
    }

    const loadImage = () => {
      try {
        setLoading(true);
        setError(false);
        
        // Use the URL directly since it should already be converted
        setCurrentSrc(src);
      } catch (err) {
        console.error('Error setting image source:', err);
        setError(true);
        setLoading(false);
        onError?.();
      }
    };

    loadImage();
  }, [src, onLoad, onError]);

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
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => {
          setLoading(false);
          onLoad?.();
        }}
        onError={(e) => {
          setError(true);
          setLoading(false);
          onError?.();
        }}
        loading="lazy"
      />
    </div>
  );
}
