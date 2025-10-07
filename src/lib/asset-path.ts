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
export function assetPath(path: string): string {
  // En desarrollo, no hay basePath
  // En producción (build), usamos el basePath de next.config.ts
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Asegurarse de que el path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
