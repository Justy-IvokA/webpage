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
 */

// Detectar si estamos en producción basándonos en la URL actual
const isProduction = typeof window !== 'undefined' 
  ? window.location.hostname === 'justy-ivoka.github.io'
  : process.env.NODE_ENV === 'production';

const BASE_PATH = isProduction ? '/webpage' : '';

export function assetPath(path: string): string {
  // Asegurarse de que el path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${BASE_PATH}${normalizedPath}`;
}
