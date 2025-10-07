/**
 * Helper para generar rutas de assets con el basePath correcto
 * En desarrollo: /asset.png
 * En producción (GitHub Pages): /webpage/asset.png
 */
export function assetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/webpage' : '';
  // Asegurarse de que el path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
