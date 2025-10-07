/**
 * Helper para generar rutas de assets con el basePath correcto
 * 
 * Next.js maneja automáticamente el basePath para:
 * - <Image> de next/image
 * - <Link> de next/link
 * 
 * Pero NO lo maneja para:
 * - <video> tags HTML nativos
 * - <source> tags
 * - <img> tags HTML nativos
 * - Rutas en CSS/estilos inline
 * 
 * Este helper debe usarse para esos casos
 * 
 * CONFIGURACIÓN:
 * - En localhost: sin basePath
 * - En GitHub Pages (*.github.io): con basePath /webpage
 * - En dominio propio (ivoka.ai): sin basePath
 */

function getBasePath(): string {
  // En el servidor durante el build
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  
  // En el cliente (navegador)
  const hostname = window.location.hostname;
  
  // Si es GitHub Pages, usar basePath
  if (hostname.includes('github.io')) {
    return '/webpage';
  }
  
  // Para localhost o dominio propio (ivoka.ai), sin basePath
  return '';
}

export function assetPath(path: string): string {
  const basePath = getBasePath();
  
  // Asegurarse de que el path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
