
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  lowResSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'aspect-square',
  loading = 'lazy',
  lowResSrc,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${aspectRatio} ${className}`}>
      {lowResSrc && !isLoaded && (
        <img 
          src={lowResSrc} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-50"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`
          w-full h-full object-cover transition-opacity duration-500 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;