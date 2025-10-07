/**
 * Helper para generar rutas de assets con el basePath correcto
 * Next.js maneja automáticamente el basePath en componentes como <Image> y <Link>
 * Este helper es solo para casos especiales donde se necesite manualmente
 * 
 * IMPORTANTE: Para <link> tags en el head, Next.js ya aplica el basePath automáticamente
 * en producción, así que no necesitamos hacer nada especial
 */
export function assetPath(path: string): string {
  // Next.js maneja el basePath automáticamente, solo retornamos el path
  return path;
}
