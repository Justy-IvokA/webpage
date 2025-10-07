/**
 * Custom image loader para Next.js Image component
 * Aplica el basePath correcto para imágenes en GitHub Pages
 */

export default function imageLoader({ src }: { src: string }) {
  // Detectar si estamos en GitHub Pages
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Si es GitHub Pages, agregar basePath
    if (hostname.includes('github.io')) {
      // Si la src ya incluye /webpage, no duplicar
      if (src.startsWith('/webpage')) {
        return src;
      }
      return `/webpage${src}`;
    }
  }
  
  // Para localhost o dominio propio, retornar sin modificar
  return src;
}
