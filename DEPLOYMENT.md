# Guía de Deployment - GitHub Pages

## Configuración Actual

El proyecto está configurado para desplegarse en GitHub Pages con las siguientes configuraciones en `next.config.ts`:

```typescript
{
  output: 'export',
  basePath: '/webpage',
  assetPrefix: '/webpage/',
  trailingSlash: true,
}
```

## Comportamiento de basePath

### En Desarrollo (`pnpm run dev`)
- **URL:** `http://localhost:3000/`
- **basePath NO se aplica** - Esto es el comportamiento normal de Next.js
- Los assets se cargan desde `/images/...`, `/videos/...`, etc.
- Esto es correcto y esperado

### En Producción (GitHub Pages)
- **URL:** `https://justy-ivoka.github.io/webpage/`
- **basePath SÍ se aplica automáticamente**
- Los assets se cargan desde `/webpage/images/...`, `/webpage/videos/...`, etc.
- Next.js maneja esto automáticamente

## Componentes que Manejan basePath Automáticamente

Next.js aplica el basePath automáticamente a:
- `<Image>` de `next/image`
- `<Link>` de `next/link`
- `<link>` tags en el `<head>`
- `<script>` tags
- Archivos estáticos en `/public`

## Verificar el Deployment

1. **Build local:**
   ```bash
   pnpm run build
   ```

2. **Verificar carpeta `out`:**
   - Los assets deben estar en `out/images/`, `out/videos/`, etc.
   - El HTML debe referenciar `/webpage/images/...`

3. **Monitorear GitHub Actions:**
   ```
   https://github.com/Justy-IvokA/webpage/actions
   ```

4. **Acceder al sitio:**
   ```
   https://justy-ivoka.github.io/webpage/
   ```

## Notas Importantes

- ⚠️ **NO** intentes acceder a `http://localhost:3000/webpage/` en desarrollo
- ✅ En desarrollo usa: `http://localhost:3000/`
- ✅ En producción usa: `https://justy-ivoka.github.io/webpage/`

## Troubleshooting

### Assets no cargan en GitHub Pages
1. Verifica que el build se completó exitosamente
2. Verifica que GitHub Pages está configurado para usar "GitHub Actions" como source
3. Espera 2-3 minutos después del deployment
4. Limpia el caché del navegador (Ctrl+Shift+R)

### Página en blanco en GitHub Pages
1. Verifica la consola del navegador para errores
2. Asegúrate de acceder a la URL completa con `/webpage/`
3. Verifica que el workflow de GitHub Actions se completó sin errores
