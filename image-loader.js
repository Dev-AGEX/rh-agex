module.exports = function loader({ src, width, quality }) {
  // Se for uma URL absoluta, parse ela
  if (src.startsWith('http')) {
    const url = new URL(src);
    
    // Se for uma imagem do Unsplash, use a API deles para otimização
    if (url.hostname === 'images.unsplash.com') {
      // Parâmetros otimizados para Unsplash
      const params = new URLSearchParams({
        w: width.toString(),
        q: (quality || 75).toString(),
        fm: 'webp',  // Formato WebP para melhor compressão
        fit: 'crop',
        crop: 'entropy', // Crop inteligente
        auto: 'compress,format',
        cs: 'tinysrgb', // Espaço de cor otimizado
        dpr: '2' // Suporte a retina display
      });

      // Remove parâmetros existentes e adiciona os otimizados
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?${params.toString()}`;
    }
    
    // Para outras URLs remotas, retorna a URL original
    return src;
  }
  
  // Para imagens locais (começando com /)
  if (src.startsWith('/')) {
    // Use o otimizador interno do Next.js
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }
  
  // Para caminhos relativos, adiciona / no início
  if (!src.startsWith('/') && !src.startsWith('http')) {
    src = '/' + src;
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }
  
  return src;
}
