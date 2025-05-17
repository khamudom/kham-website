import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ImageOff } from 'lucide-react';
import styles from '../styles/LazyImage.module.css';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  fallbackSrc?: string;
  sizes?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  fallbackSrc,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // If priority is true, we don't need to use IntersectionObserver
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    // Skip observation if image is priority
    skip: priority
  });

  // Handle image load complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    setHasError(true);
  };

  // Calculate aspect ratio for placeholder if dimensions are provided
  const aspectRatio = width && height ? (height / width) : undefined;
  
  // Determine if the image should be loaded
  const shouldLoad = priority || inView;

  // Determine which image source to use
  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div 
      ref={!priority ? ref : undefined} 
      className={`${styles.container} ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: aspectRatio ? `${width}/${height}` : undefined,
      }}
    >
      {/* Animated placeholder */}
      <div 
        className={`${styles.placeholder} ${isLoaded ? styles.placeholderHidden : ''}`}
      >
        <div className={styles.shimmer}></div>
      </div>

      {/* Actual image - only load when in viewport or priority */}
      {shouldLoad && !hasError && (
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
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
          {fallbackSrc ? (
            <img
              src={fallbackSrc}
              alt={alt}
              className={styles.fallbackImage}
              width={width}
              height={height}
              style={{ objectFit }}
            />
          ) : (
            <div className={styles.errorContainer}>
              <ImageOff size={48} className={styles.errorIcon} />
              <span className={styles.errorText}>Image not available</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LazyImage;