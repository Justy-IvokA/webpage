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

// Cache del basePath para evitar recalcular en cada llamada
let cachedBasePath: string | null = null;

function getBasePath(): string {
  // Si ya tenemos el basePath en cache, usarlo
  if (cachedBasePath !== null) {
    return cachedBasePath;
  }
  
  // En el servidor durante el build
  if (typeof window === 'undefined') {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return basePath;
  }
  
  // En el cliente (navegador)
  try {
    const hostname = window.location.hostname;
    
    // Si es GitHub Pages, usar basePath
    if (hostname.includes('github.io')) {
      cachedBasePath = '/webpage';
      return '/webpage';
    }
    
    // Para localhost o dominio propio (ivoka.ai), sin basePath
    cachedBasePath = '';
    return '';
  } catch (error) {
    // Fallback en caso de error (Safari/iPhone pueden tener problemas)
    console.warn('Error detecting hostname, using default basePath');
    return '';
  }
}

export function assetPath(path: string): string {
  const basePath = getBasePath();
  
  // Asegurarse de que el path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
