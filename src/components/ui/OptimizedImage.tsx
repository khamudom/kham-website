import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';
import { generatePlaceholderImage } from '../utils/imageUtils';
import styles from '../styles/OptimizedImage.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  fallbackSrc,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Generate default fallback if none provided
  const defaultFallback = fallbackSrc || generatePlaceholderImage(alt, width, height);

  // Handle image load complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    if (imageSrc !== defaultFallback) {
      setImageSrc(defaultFallback);
      setIsLoaded(false); // Reset loaded state for fallback image
    } else {
      setHasError(true);
    }
  };

  // Update image source if prop changes
  useEffect(() => {
    if (src !== imageSrc && !hasError) {
      setImageSrc(src);
      setIsLoaded(false);
    }
  }, [src]);

  // Calculate aspect ratio for placeholder if dimensions are provided
  const aspectRatio = width && height ? (height / width) : undefined;

  return (
    <div 
      className={`${styles.container} ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: aspectRatio ? `${width}/${height}` : undefined,
      }}
    >
      {/* Centered placeholder */}
      {!isLoaded && !hasError && (
        <div className={styles.placeholder}>
          <div className={styles.placeholderContent}>
            <div className={styles.placeholderSpinner}></div>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${styles.image} ${isLoaded ? styles.imageLoaded : ''}`}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          width={width}
          height={height}
          sizes={sizes}
          style={{ 
            objectFit,
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}

      {/* Fallback for error state */}
      {hasError && (
        <div className={styles.fallback}>
          <div className={styles.errorContainer}>
            <ImageOff size={48} className={styles.errorIcon} />
            <span className={styles.errorText}>Image not available</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;