import { useState, useEffect } from 'react';
import Image from 'next/image';

interface UnsplashImageProps {
  id: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

export function UnsplashImage({
  id,
  alt,
  className = '',
  width = 1920,
  height = 1080,
  priority = false,
  quality = 80,
}: UnsplashImageProps) {
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    // Atualiza a largura do viewport
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
    };

    // Atualiza inicialmente
    updateViewport();

    // Adiciona listener para redimensionamento
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    // Calcula a largura ideal baseada no viewport
    const idealWidth = Math.min(viewportWidth * 2, width); // 2x para retina displays
    
    // Constrói a URL otimizada do Unsplash
    const params = new URLSearchParams({
      w: idealWidth.toString(),
      q: quality.toString(),
      fm: 'webp',
      fit: 'crop',
      crop: 'entropy',
      auto: 'compress,format',
      cs: 'tinysrgb',
      dpr: '2'
    });

    setSrc(`https://images.unsplash.com/photo-${id}?${params.toString()}`);
  }, [id, quality, viewportWidth, width]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src && (
        <>
          {/* Versão de baixa qualidade para carregamento rápido */}
          <Image
            src={`https://images.unsplash.com/photo-${id}?w=20&q=10&blur=10`}
            alt={alt}
            width={width}
            height={height}
            className={`
              absolute inset-0 w-full h-full
              transition-opacity duration-500
              ${loading ? 'opacity-100' : 'opacity-0'}
            `}
            priority={priority}
          />
          
          {/* Imagem principal em alta qualidade */}
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
            sizes={`
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            `}
          />
        </>
      )}
    </div>
  );
}
