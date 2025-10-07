/**
 * Custom image loader para Next.js Image component
 * Aplica el basePath correcto para imágenes en GitHub Pages
 */

interface ImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Si la src es una URL completa (http/https), retornarla sin modificar
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Detectar si estamos en GitHub Pages
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Si es GitHub Pages, agregar basePath
    if (hostname.includes('github.io')) {
      // Si la src ya incluye /webpage, no duplicar
      if (src.startsWith('/webpage')) {
        return src;
      }
      // Asegurarse de que comience con /
      const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
      return `/webpage${normalizedSrc}`;
    }
  }
  
  // En el servidor durante SSG (GitHub Pages build)
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    if (src.startsWith('/webpage')) {
      return src;
    }
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    return `/webpage${normalizedSrc}`;
  }
  
  // Para localhost o dominio propio, retornar sin modificar
  return src;
}
