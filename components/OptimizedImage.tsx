'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width = 1920,
  height = 1080,
  priority = false
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          w-full h-full
          transition-opacity duration-500
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoadingComplete={() => setLoading(false)}
        priority={priority}
      />
    </div>
  );
}
